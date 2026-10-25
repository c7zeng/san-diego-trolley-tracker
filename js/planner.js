import {lines,stopById} from '../data/stops.js';
export function routes(from,to){
 if(!stopById[from]||!stopById[to]||from===to)return [];
 const graph={};for(const id of Object.keys(stopById))graph[id]=[];
 for(const [lineId,line] of Object.entries(lines))for(let i=0;i<line.stops.length-1;i++){
  const a=line.stops[i],b=line.stops[i+1],minutes=line.minutes[i];
  graph[a].push({to:b,minutes,lineId});graph[b].push({to:a,minutes,lineId});
 }
 const dist={[from]:0},paths={[from]:[]},pending=new Set(Object.keys(graph));
 while(pending.size){let current=null;for(const id of pending)if(dist[id]!==undefined&&(current===null||dist[id]<dist[current]))current=id;
  if(current===null||current===to)break;pending.delete(current);
  for(const edge of graph[current]){const candidate=dist[current]+edge.minutes;
   if(dist[edge.to]===undefined||candidate<dist[edge.to]){dist[edge.to]=candidate;paths[edge.to]=[...paths[current],{from:current,...edge}]}}
 }
 return paths[to]||[];
}
export function estimateTrip({from,to,deadline,walking=8,buffer=5,wait=8}){
 const path=routes(from,to);if(!path.length)throw Error('Choose two connected, different stations.');
 if(!(deadline instanceof Date)||!Number.isFinite(deadline.getTime()))throw Error('Enter a valid arrival deadline.');
 if(![walking,buffer,wait].every(n=>Number.isFinite(n)&&n>=0&&n<=180))throw Error('Enter times between 0 and 180 minutes.');
 const ride=path.reduce((s,x)=>s+x.minutes,0), transfers=path.slice(1).filter((x,i)=>x.lineId!==path[i].lineId).length;
 const total=ride+walking+buffer+wait*(transfers+1);
 return {path,ride,transfers,total,departure:new Date(deadline.getTime()-total*60000)};
}
export const formatTime=date=>new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(date);
