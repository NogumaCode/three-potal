# r3f-vite-starter
A boilerplate to build R3F projects

```
yarn
yarn dev
```
参考にした方：Wawa sensei
https://www.youtube.com/watch?v=2W_VR92Pqgs&t=619s

①Craft an experience in one clickサイトから背景画像を取得
https://www.blockadelabs.com/

②球体を準備して、画像を設置

③カメラ調整や環境光を設定

④3Dモデルを準備

⑤GLTF (または GLB) モデルを React の three.js の jsx コンポーネントに変換する
npx gltfjsx public/models/Fish.gltf -o "src/components/Fish.jsx" -r "public"
npx gltfjsx public/models/Dragon_Evolved.gltf -o "src/components/Dragon_Evolved.jsx" -r "public"
npx gltfjsx public/models/Cactoro.gltf -o "src/components/Cactoro.jsx" -r "public"

⑥Fish.jsxをFishコンポーネントに変更して、Experienceに設置
console.logでアクションをチェック

⑦Fish.jsxのIdle状態でスタートするようにuseEffectで設定

【モンスターをカードの中に埋める】
①Experience.jsxに平面RoudedBoxを作り、モンスターを設置。暗くなるので、ライトと環境光設置
<RoundedBox args={[2,3,0.1]}>
        <MeshPortalMaterial side={THREE.DoubleSide}>
        <ambientLight intensity={1} />
        <Environment preset="sunset" />
          <Fish scale={0.6} position-y={-1} />
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            {/* THREE.BackSideは環境画像にする */}
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>

【モンスターステージの作成】
MeshPortalMaterial
https://github.com/pmndrs/drei#meshportalmaterial


const MonsterStage = ({ children,texture, ...props }) => {
  const map = useTexture(
    texture
  );
  return (
    <group {...props}>
      <RoundedBox args={[2, 3, 0.1]}>
        <MeshPortalMaterial side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            {/* THREE.BackSideは環境画像にする */}
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

同様に残りのモデルも作成　ドラゴンはアクションがFlying_Idleになります。

【テキストの設定】
①フォントを設定
モンスターの名前を入れる　monstarstageにpropsで渡す

【モンスターをダブルクリックで飛び出す】
useState


yarn add maath
【】
