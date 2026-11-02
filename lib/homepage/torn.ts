/**
 * Deterministic torn-edge polygons for clip-path. Pure maths on a seed, so server and client
 * agree. Heights are in px offsets from the edge, so the tear is the same size on any page height.
 */
function rand(seed: number, i: number) {
  const x = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function tornBottom(seed: number, steps = 40, amp = 16): string {
  const pts = ["0 0", "100% 0"];
  for (let i = steps; i >= 0; i--) {
    const x = ((i / steps) * 100).toFixed(2);
    const y = Math.round(rand(seed, i) * amp);
    pts.push(`${x}% calc(100% - ${y}px)`);
  }
  return `polygon(${pts.join(", ")})`;
}

export function tornTopBottom(seed: number, steps = 30, amp = 12): string {
  const top: string[] = [];
  for (let i = 0; i <= steps; i++) top.push(`${((i / steps) * 100).toFixed(2)}% ${Math.round(rand(seed, i) * amp)}px`);
  const bottom: string[] = [];
  for (let i = steps; i >= 0; i--) bottom.push(`${((i / steps) * 100).toFixed(2)}% calc(100% - ${Math.round(rand(seed + 7, i) * amp)}px)`);
  return `polygon(${[...top, ...bottom].join(", ")})`;
}
