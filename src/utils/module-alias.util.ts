import moduleAlias from "module-alias";
import moduleAliases from "../configs/module-alias.config";

moduleAlias.addAliases(moduleAliases);

const modules = {
  register: () => moduleAlias(),
};

export default modules;
