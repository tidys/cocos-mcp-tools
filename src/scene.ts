declare const cc: any;

const arr = [];
async function createEngineNode(name: string) {
  const node = new cc.Node(name);
  const uuid = node.uuid;
  arr.push(uuid);
  cc.director.getScene().addChild(node); // 必须加上去才能被保存为prefab
  return uuid;
}

function getOpenPrefabRootNodeUUID() {
  // scene?prefab?
  const children = cc.director.getScene().children;
  // let isPrefab = false;
  // const d = children.find((el) => el.name === "should_hide_in_hierarchy");
  // if (d) {
  //   isPrefab = true;
  //   return d[0].uuid;
  // }
  // 判断是否有关联的预制体即可
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child._prefab && child._prefab.fileId) {
      console.log(`prefab fileId: ${child._prefab.fileId}`);
      return child.uuid;
    }
  }
  return "";
}
export const methods = {
  createEngineNode,
  cleanTempNodes() {
    if (arr.length === 0) return;
    // 不能缓存节点，因为节点在经过创建预制体后，会发生变化
    const children = cc.director.getScene().children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child._prefab && child._prefab.fileId) {
        const idx = arr.findIndex((uuid) => uuid === child._prefab.fileId);
        if (idx !== -1) {
          child.destroy();
          arr.splice(idx, 1);
        }
      }
    }
  },
  addSpriteComponent(nodeUUID: string) {
    let node = null;
    cc.director.getScene().walk((n: any) => {
      if (n.uuid === nodeUUID) {
        node = n;
      }
    });
    if (!node) {
      return "node not found";
    }
    if (node.getComponent(cc.Sprite)) {
      return "node already has sprite component";
    }
    // @ts-ignore
    Editor.Message.request("scene", "create-component", { uuid: nodeUUID, component: "cc.Sprite" });
    return "success";
  },
  getOpenPrefabRootNodeUUID,
};
