export function Desert() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20]} />
      {/* Basic Material - Guaranteed to render without light */}
      <meshBasicMaterial color="#221100" />
    </mesh>
  );
}
