type D3HierarchyNode = {
    name: string;
    children: D3HierarchyNode[];
  };
  
  const jsonToD3Hierarchy = (obj: any, key: string = "root"): D3HierarchyNode => {
    const children: D3HierarchyNode[] = [];
  
    // RECURSIVE CASE: If the object is a nested object, recursively convert children
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((childKey) => {
        console.log(`Run recursion on ${childKey}`);
        const child = jsonToD3Hierarchy(obj[childKey], childKey);
        if (child) {
          children.push(child);
        }
      });
    }
  
    // BASE CASE: Return the current node with its name and children
    return {
      name: key, // The current node's name
      children // If there are no children, this will be an empty array, which is valid
    };
  };
  
  export default jsonToD3Hierarchy;
  