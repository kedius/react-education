export default contextTypes => DecoratedComponent => {
  DecoratedComponent.contextTypes = contextTypes;

  return DecoratedComponent;
};
