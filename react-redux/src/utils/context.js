export default contextTypes => DecoratedComponent => {
  DecoratedComponent.contextTypes = Object.assign(
    {},
    DecoratedComponent.contextTypes,
    contextTypes
  );

  return DecoratedComponent;
};
