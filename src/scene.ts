declare const cc: any;

const arr = [];
async function createEngineNode(name: string) {
  const node = new cc.Node(name);
  const uuid = node.uuid;
  arr.push(uuid);
  cc.director.getScene().addChild(node); // 必须加上去才能被保存为prefab
  return uuid;
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
};
