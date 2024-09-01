// Ex: '[ ](https://thecortex.cortexflex.org/group/test?msg=abcdef)  Test'
// Return: 'Test'
export const formatHyperlink = (text: string): string => text.replace(/^\[([\s]*)\]\(([^)]*)\)\s/, '').trim();
