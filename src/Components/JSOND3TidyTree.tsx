import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Container, Paper, Button } from '@mui/material';

// Define the TreeNode interface to represent your data structure
interface TreeNode {
  name: string;
  children?: TreeNode[] | null;  // Allow children to be null
  _children?: TreeNode[];
}

// Define the props for the TidyTreeCombo component
interface TidyTreeComboProps {
  d3Data: TreeNode | null; // Accept TreeNode or null
}

const JSOND3TidyTree: React.FC<TidyTreeComboProps> = ({ d3Data }) => {
  const [localD3Data, setLocalD3Data] = React.useState<any>(d3Data);

  // Reference SVG element in HTML that is not yet existed
  const svgRef = useRef<SVGSVGElement>(null);

  // Store local D3 data
  useEffect(() => {
    setLocalD3Data(d3Data);
}, [d3Data])

  // Create D3 Tidy Tree Element
  useEffect(() => {
    if (!d3Data || typeof d3Data !== 'object') {
      console.error('Invalid data provided to Tidy Tree Visualization');
      return;
    }
  
    // Dynamic width and calculate height based on tree depth
    const width = 1200;
    const root = d3.hierarchy<TreeNode>(d3Data); // Specify the type for hierarchy
    const dx = 10;
    const dy = width / (root.height + 1);
    const tree = d3.tree<TreeNode>().nodeSize([dx, dy]); // Specify TreeNode for tree
  
    // Initialize the collapse state for each node
    root.each(d => {
      d.data._children = d.children;  // Store the original children in _children
      if (d.depth && d.data._children) d.children = null as unknown as d3.HierarchyNode<TreeNode>[];  // Initially collapse all except root
    });
  
    function update() {
      if (!d3Data){
        return;
      }

      // Compute the new tree layout
      const root = d3.hierarchy<TreeNode>(d3Data);  // Recreate hierarchy
      tree(root);  // Apply the tree layout to the data
      
      let x0 = Infinity;
      let x1 = -x0;
  
      // Ensure that all nodes have x and y values
      root.each(d => {
        if (d.x !== undefined) {
          if (d.x > x1) x1 = d.x;
          if (d.x < x0) x0 = d.x;
        }
      });
  
      const height = x1 - x0 + dx * 2;
  
      // Select and clear previous elements from SVG
      const svg = d3.select(svgRef.current)
        .attr("width", 1200)
        .attr("height", height)
        .attr("viewBox", [-dy / 3, x0 - dx, 1200, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");
      svg.selectAll('*').remove();
  
      // Create links between nodes
      const linkGenerator = d3.linkHorizontal<d3.HierarchyLink<TreeNode>, d3.DefaultLinkObject>()
        .x((d: any) => d.y)
        .y((d: any) => d.x);
  
      svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 2)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", linkGenerator);
  
      // Create and update nodes
      const node = svg.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`) // Set node position
        .on("click", (event, d) => {
          // Toggle children on click
          if (d.children) {
            d.data._children = d.children.map(child => child.data); // Store raw data
            d.children = null as unknown as d3.HierarchyNode<TreeNode>[]; // Collapse children
          } else {
            if (d.data._children) {
              d.children = d.data._children.map(childData => d3.hierarchy(childData)); // Restore as hierarchy nodes
              d.data._children = null as unknown as d3.HierarchyNode<TreeNode>[]; // Clear collapsed children
            }
          }
          update(); // Re-render after toggling
        });
  
      // Append circles for each node
      node.append("circle")
        .attr("r", 5)
        .style("fill", d => d.data._children ? "#69b3a2" : "#999");
  
      // Append text labels for each node
      node.append("text")
        .attr("dy", ".35em")
        .attr("x", d => (d.children ? -10 : 10))
        .attr("text-anchor", d => (d.children ? "end" : "start"))
        .text(d => d.data.name)
        .attr("fill", "#000");
  
      // Add hover effects (optional)
      node.on("mouseover", (event, d) => {
        d3.select(event.currentTarget).select("circle").attr("stroke", "blue");
      })
      .on("mouseout", (event, d) => {
        d3.select(event.currentTarget).select("circle").attr("stroke", null);
      });
    }
  
    // Initial render
    update();
  
  }, [d3Data]);

  // When 'Clear Content' button is clicked
  const handleClearContentClick = () => {
    setLocalD3Data(null);
  }

  // Render D3 Tidy Tree element
  return (
    <Container
      sx={{ marginTop: '20px',}}
    >
      { localD3Data ? (
        <Paper 
        elevation={3} 
        sx={{
          padding: '20px',
          marginTop: '20px',
        }}>
          <svg ref={svgRef}></svg>
        </Paper>
      ) : null }

      { localD3Data? (
        <Paper 
        elevation={0} 
        sx={{
          padding: '20px',
          marginTop: '20px',
        }}>
          <Button 
          onClick={handleClearContentClick} 
          variant="outlined" 
          color='error'> 
            Clear Content 
          </Button>
        </Paper>
      ) : null }
    </Container>
  );
};

export default JSOND3TidyTree;