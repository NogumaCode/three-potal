import {
  Environment,
  MeshPortalMaterial,
  useTexture,
  RoundedBox,
  Text,
  CameraControls,
  useCursor,
} from "@react-three/drei";
import * as THREE from "three";
import { Fish } from "./Fish";
import { Cactoro } from "./Cactoro";
import { DragonEvolved } from "./Dragon_Evolved";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true,);
    }else{
      controlsRef.current.setLookAt(
        0,
        0,
        10,
       0,
       0,
       0,
        true,);

    }
  }, [active]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls ref={controlsRef} maxPolarAngle={Math.PI /2} minPolarAngle={Math.PI/6}/>
      <MonsterStage
        name="Fish King"
        color="#38adff"
        texture={
          "./textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
        }
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Fish scale={0.6} position-y={-1} hovered={hovered === "Fish King"} />
      </MonsterStage>
      <MonsterStage
        texture={"./textures/anime_art_style_lava_world.jpg"}
        name="Dragon"
        color={"#df8d52"}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <DragonEvolved scale={0.5} position-y={-1} hovered={hovered === "Dragon"} />
      </MonsterStage>
      <MonsterStage
        texture={"./textures/anime_art_style_cactus_forest.jpg"}
        position-x={2.5}
        name="Cactoro"
        color={"#1c934a"}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Cactoro scale={0.45} position-y={-1} hovered={hovered === "Cactoro"} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });
  return (
    <group {...props}>
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial
          ref={portalMaterial}
          side={THREE.DoubleSide}
          // blend={active === name ? 1 : 0}
        >
          {/* 環境光を追加 */}
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            {/*  環境画像を球体に貼り付ける sphereGeometry args={[球の半径。デフォルトは 1,球の幅方向の分割数。デフォルトは 8, 球の高さ方向の分割数。デフォルトは 6 ,球の開始角度（縦方向）。デフォルトは 0,球の中心角（縦方向）。デフォルトは Math.PI * 2 ,球の開始角度（横方向）。デフォルトは 0 ,球の中心角（横方向）。デフォルトは Math.PI ])  64にすることで滑らかになる */}
            <sphereGeometry args={[5, 64, 64]} />
            {/* THREE.BackSideは環境画像ジオメトリの裏面（通常は内側）だけを描画 */}
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
