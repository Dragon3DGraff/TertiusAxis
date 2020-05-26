class Calc {
	constructor(){

	}

	

}

function getVolume(geometry) {

	if (!geometry.isBufferGeometry) {

		console.log("'geometry' must be an indexed or non-indexed buffer geometry"); return 0;

	}
	let isIndexed = geometry.index !== null;
	let position = geometry.attributes.position; 
	let sum = 0;
	let p1 = new Vector3(), p2 = new Vector3(), p3 = new Vector3();

	if (!isIndexed) {

		let faces = position.count / 3;

		for (let i = 0; i < faces; i++) {

			p1.fromBufferAttribute(position, i * 3 + 0);
			p2.fromBufferAttribute(position, i * 3 + 1);
			p3.fromBufferAttribute(position, i * 3 + 2);

			sum += signedVolumeOfTriangle(p1, p2, p3);

		}
	}
	else {
		let index = geometry.index;
		let faces = index.count / 3;

		for (let i = 0; i < faces; i++){

			p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
			p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
			p3.fromBufferAttribute(position, index.array[i * 3 + 2]);

			sum += signedVolumeOfTriangle(p1, p2, p3);

		}
	}

	return sum;

}
		 
function signedVolumeOfTriangle(p1, p2, p3) {

	return p1.dot(p2.cross(p3)) / 6.0;

}

function findBaryCenter( points ) {

	if ( !Array.isArray( points) ) return null;

	let pointsCount = points.length;

	let resultVector = points.reduce( (sum, current) => sum.add(current ) );
	let baryCenter = resultVector.divideScalar( pointsCount );

	return baryCenter;

}

export { getVolume, findBaryCenter };