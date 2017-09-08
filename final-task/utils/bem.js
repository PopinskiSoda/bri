export default function(bemOptions) {
  // const {block, element, modifier, DOMElement} = bemOptions;
  const
    block = bemOptions.block || '',
    element = bemOptions.element || '',
    modifier = bemOptions.modifier || '';
    // tag = bemOptions.tag || 'div';

  const
    elementStr = element ? ' ${block}__${element}' : '',
    modifierStr = modifier ? (
      element ? ' ${block}__${element}--${modifier}' : ' ${block}--${modifier}'
    ) : '';

  const
    className = `${block}${elementStr}${modifierStr}`,    // WRONG
    classStr = className ? ` class="${className}"` : '';

  // const
  //   tagBegin = `<${tag}${classStr}>`,
  //   tagEnd = `</${tag}>`;

  // const optionsStr = options || '';

  // console.log(bemOptions, options);

  // return `${tagBegin}${optionsStr}${tagEnd}`;
  return classStr;
}