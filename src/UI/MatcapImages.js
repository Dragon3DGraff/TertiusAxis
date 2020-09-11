export default class MatcapImages {
	constructor(  ){

		this.images_64 = this.importAll( require.context( '../_Resources/Matcabs/Test/', false, /\.(png)$/ ));
		this.cards_64 = this.createCards( this.images_64 );

	}

	importAll(r) {
		let images = {};
		r.keys(0).map((item) => {
			 images[item.replace( './', '')] = r(item)
			});
		return images
	}

	 createCards ( images ) {
		let cards = [ ];
		let imagesModules = Object.entries ( images );
		imagesModules.map( (img, index) => {
			cards.push(
				{
					name: 'Card ' + index,
					img: img[1].default,
					src: img[0]
				}
			)	
		})
		return cards;
	}
	
	



}


