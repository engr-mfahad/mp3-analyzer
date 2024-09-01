import { ErrorCode } from "@enums/error-code";
import env from "@utils/env";
import fs from "fs";
import path from "path";

let _nextFrameIndex = 0;
const _samplingRates = [44100, 48000, 32000],
  _bitrates = [32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];

function _validateID3(buffer: Buffer): ErrorCode | null {
  return buffer.subarray(0, 3).toString("ascii") === "ID3"
    ? null
    : ErrorCode.UnrecognizableFormat;
}

function _validateMPEGVersionAndLayer(buffer: Buffer): ErrorCode | null {
  // code below extracts 8 bits from the frame's header which includes:
  //    - syncword (3 bits)
  //    - version (2 bits)
  //    - layer (2 bits)
  //    - protection_bit (1 bit)
  const verLayBits = buffer
    .subarray(_nextFrameIndex, _nextFrameIndex + 4)
    .readUInt8(1);

  // to get the correct values for both version and layer, now proceed with logical AND
  // to eliminate unnecessary bits and then shifting it right to normalize
  const version = (verLayBits & 0x18) >> 3,
    layer = (verLayBits & 0x06) >> 1;

  // validating for MPEG Version 1 and Layer 3
  if (version !== 0x03) return ErrorCode.VersionMismatch;
  else if (layer !== 0x01) return ErrorCode.LayerMismatch;
  return null;
}

function _validateID3Frame(header: Buffer) {
  // syncword is of 11 bits so getting the 16 bits first and then shifting it right
  // to normalize the value for comparision
  return header.readUInt16BE() >> 5 === 0x7ff;
}

function _getFirstMPEGFrameIndex(buffer: Buffer) {
  let frameIndex = -1;
  for (let i = 0; i < buffer.length - 4; i++) {
    if (_validateID3Frame(buffer.subarray(i, i + 4))) {
      frameIndex = i;
      break;
    }
  }
  return frameIndex;
}

function _validatePrereqs(buffer: Buffer) {
  const id3ValidationResult = _validateID3(buffer);
  if (!!id3ValidationResult) throw new Error(id3ValidationResult);

  _nextFrameIndex = _getFirstMPEGFrameIndex(buffer.subarray(4)) + 4;

  const mpegVersionAndLayerValidationResult =
    _validateMPEGVersionAndLayer(buffer);
  if (!!mpegVersionAndLayerValidationResult)
    throw new Error(mpegVersionAndLayerValidationResult);
}

function _calcCurrentFrameSize(buffer: Buffer) {
  // extract 8 bits which contains following metadata to calc the current frame's size:
  //    - bitrate_index (4 bits)
  //    - sampling_frequency (2 bits)
  //    - padding_bit (1 bit)
  //    - private_bit (1 bit)
  const frameSizeBits = buffer
      .subarray(_nextFrameIndex + 2, _nextFrameIndex + 3)
      .readUInt8(),
    bitrateIndex = frameSizeBits >> 4,
    samplingRateIndex = (frameSizeBits & 0xc) >> 2,
    padding = (frameSizeBits & 0x2) >> 1;

  return Math.trunc(
    (144 * _bitrates[bitrateIndex - 1] * 1000) /
      _samplingRates[samplingRateIndex] +
      padding
  );
}

function _validateVBRMPEG(buffer: Buffer) {
  let isVBRMPEG = false;
  for (let i = 0; i < _nextFrameIndex; i++) {
    const vbrText = buffer.subarray(i, i + 4).toString("ascii");
    if (vbrText === "Xing" || vbrText === "Info") {
      isVBRMPEG = true;
      break;
    }
  }
  return isVBRMPEG;
}

function _countFrames(filePath: string) {
  const buffer = fs.readFileSync(path.join(env.BASE_DIR, filePath));
  let frameCount = 0;
  _validatePrereqs(buffer);
  let isVBRChecked = false;
  while (_nextFrameIndex < buffer.length) {
    const currentFrameIndex = _nextFrameIndex;
    if (!isVBRChecked) {
      _nextFrameIndex += _calcCurrentFrameSize(buffer);
      if (_validateVBRMPEG(buffer.subarray(currentFrameIndex + 4)))
        frameCount--;
      isVBRChecked = true;
    } else _nextFrameIndex += _calcCurrentFrameSize(buffer);
    if (
      _validateID3Frame(
        buffer.subarray(currentFrameIndex, currentFrameIndex + 4)
      )
    )
      frameCount++;
  }
  return frameCount;
}

const parser = {
  countFrames: (filePath: string) => _countFrames(filePath),
};

export default parser;
