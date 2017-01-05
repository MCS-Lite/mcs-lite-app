
export default function renderToJson(element) {
  var res = {};
  if (!element || !element.type) {
    return {};
  }
  var Component = element.type;
  res.name = element.type;
  res.attributes = { ...element.props };
  var children = element.props ? element.props.children : null;
  delete res.attributes.children;
  if (typeof Component != "string") {
    var instance = new Component(element.props);
    res.name = Component.name;
    children = instance.render();
  }
  if (Array.isArray(children)) {
    res.children = children.map(function(child) {
      return renderToJson(child);
    });
    return res;
  }
  res.children = [renderToJson(children)];
  return res;
};
