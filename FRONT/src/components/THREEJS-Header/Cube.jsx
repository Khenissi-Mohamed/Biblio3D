import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
// import { BoxBufferGeometry, Mesh, MeshStandardMaterial } from 'three';

function Cube(props) {
    const meshRef = useRef();

    useFrame(() => {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.03;
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
        >
            <boxBufferGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
                color={'#46281d'}

            />
        </mesh>
    );
}

export default Cube;

// import React, { useRef } from 'react';
// import { useFrame } from 'react-three-fiber';
// import * as THREE from 'three';

// function Cube(props) {
//     const meshRef = useRef();

//     useFrame(() => {
//         meshRef.current.rotation.x += 0.01;
//         meshRef.current.rotation.y += 0.03;
//     });

//     // Créez une texture de dégradé linéaire
//     const canvas = document.createElement('canvas');
//     canvas.width = 256;
//     canvas.height = 256;

//     const context = canvas.getContext('2d');
//     const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
//     gradient.addColorStop(0, 'rgba(33,50,68,1)');
//     gradient.addColorStop(0.38, 'rgba(160,92,57,1)');
//     gradient.addColorStop(1, 'rgba(20,22,28,1)');
//     context.fillStyle = gradient;
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     const texture = new THREE.CanvasTexture(canvas);

//     // Créez un matériau avec la texture de dégradé
//     const material = new THREE.MeshStandardMaterial({
//         color: 0x46281d,
//         map: texture,
//     });

//     return (
//         <mesh
//             {...props}
//             ref={meshRef}
//         >
//             <boxBufferGeometry args={[2, 2, 2]} />
//             <primitive object={material} attach="material" />
//         </mesh>
//     );
// }

// export default Cube;


