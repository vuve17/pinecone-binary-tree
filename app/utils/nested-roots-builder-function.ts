export function buildNestedInclude(depth: number): unknown {
  if (depth <= 0) return true;

  return {
    children: {
      orderBy: { ordering: "asc" },
      include: buildNestedInclude(depth - 1),
    },
  };
}
