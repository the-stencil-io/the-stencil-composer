import React from 'react';
import * as d3 from 'd3';

import flare from './flare';
import { API, Ide } from '../../deps';


const width = 954;
const radius = width / 2;
//viewBox="the points "seen" in this SVG drawing area. 4 values separated by white space or commas. (min x, min y, width, height)"
const viewBox = `${-width / 2},  ${-width / 2}, ${width}, ${width}`;
const colornone = "#ccc"
const colorin = "#00f";
const colorout = "#f00";


function bilink(root) {
  const map = new Map(root.leaves().map(d => [id(d), d]));
  for (const d of root.leaves()) {
    d.incoming = [];
    d.outgoing = d.data.imports.map(i => [d, map.get(i)]);
  };

  for (const d of root.leaves()) {
    for (const o of d.outgoing) {
      o[1].incoming.push(o);
    }
  };
  return root;
}

function id(node) {
  return `${node.parent ? id(node.parent) + "." : ""}${node.data.name}`;
}


const GraphView: React.FC<{}> = () => {
  const ref = React.createRef<HTMLDivElement>();
  const site = Ide.useSite();
  const [init, setInit] = React.useState(false);


  React.useEffect(() => {
    if (!ref.current || init) {
      return;
    }

  console.log("WTFFFF");
    setInit(true);

    const svg = d3.create("svg").attr("viewBox", viewBox);
    const tree = d3.cluster().size([2 * Math.PI, radius - 100])
    const line = d3.lineRadial()
      .curve(d3.curveBundle.beta(0.85))
      .radius(d => (d as any).y)
      .angle(d => (d as any).x);


    const root = tree(bilink(
      d3.hierarchy(flare).sort((a, b) => d3.ascending(a.height, b.height) || d3.ascending((a.data as any).name, (b.data as any).name))
    )
    );





    // data labels
    const node = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", (props0) => {
        return `rotate(${(props0 as any).x * 180 / Math.PI - 90}) translate(${(props0 as any).y},0)`;
      })

      .append("text")
      .attr("dy", "0.31em")
      .attr("x", d => (d as any).x < Math.PI ? 6 : -6)
      .attr("text-anchor", d => (d as any).x < Math.PI ? "start" : "end")
      .attr("transform", d => (d as any).x >= Math.PI ? "rotate(180)" : null)
      .text(d => (d as any).data.name)
      .each(function(d) { (d as any).text = this; })
      .call(text => text.append("title").text(d => {
        //console.log(d);
        return `${id(d)} ${(d as any).outgoing.length} outgoing ${(d as any).incoming.length} incoming`;
      }));


    const outgoing = (root.leaves() as any).flatMap(leaf => (leaf as any).outgoing) as any;
    const link = svg.append("g")
      .attr("stroke", colornone)
      .attr("fill", "none")
      .selectAll("path")
      .data(outgoing)
      .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("d", (props: any) => {

        const i = props[0];
        const o = props[1];
        
        const path = i.path(o);
        const resp = line(path);
        return resp;
      })
      .each(function(d) { (d as any).path = this; });


    /*
    
        function overed(event, d) {
          link.style("mix-blend-mode", null);
          //d3.select(this).attr("font-weight", "bold");
          d3.selectAll(d.incoming.map(d => d.path)).attr("stroke", colorin).raise();
          d3.selectAll(d.incoming.map(([d]) => d.text)).attr("fill", colorin).attr("font-weight", "bold");
          d3.selectAll(d.outgoing.map(d => d.path)).attr("stroke", colorout).raise();
          d3.selectAll(d.outgoing.map(([, d]) => d.text)).attr("fill", colorout).attr("font-weight", "bold");
        }
    
        function outed(event, d) {
          link.style("mix-blend-mode", "multiply");
          //d3.select(node).attr("font-weight", null);
          d3.selectAll(d.incoming.map(d => d.path)).attr("stroke", null);
          d3.selectAll(d.incoming.map(([d]) => d.text)).attr("fill", null).attr("font-weight", null);
          d3.selectAll(d.outgoing.map(d => d.path)).attr("stroke", null);
          d3.selectAll(d.outgoing.map(([, d]) => d.text)).attr("fill", null).attr("font-weight", null);
        }
    */
    const svgNode = svg.node() as any;
    ref.current.append(svgNode);


  }, [ref, init, setInit]);



  return (
    <div ref={ref}>
    </div>
  )
}

export { GraphView }