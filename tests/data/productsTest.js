import { Product, Appliance, Clothing } from "../../data/products.js";

describe('test suite: Appliance', () => {
  let appliance;

  beforeEach(() => {
    appliance = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: 'appliances',
      instructionsLink: 'images/appliance-instructions.png',
      warrantyLink: 'images/appliance-warranty.png',
    });
  });

  it('has the correct properties', () => {
    // Note: you don't have to test all the properties.
    // You can just pick a few to test.
    expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(appliance.image).toEqual('images/products/black-2-slot-toaster.jpg');
    expect(appliance.name).toEqual('2 Slot Toaster - Black');
    expect(appliance.rating).toEqual({
      stars: 5,
      count: 2197
    });
    expect(appliance.instructionsLink).toEqual('images/appliance-instructions.png');
  });

  it('gets the stars url', () => {
    expect(appliance.getStarsUrl()).toEqual('images/ratings/rating-50.png');
  });

  it('gets the product price', () => {
    expect(appliance.getPrice()).toEqual('$18.99')
  })

  it('display any extra info', () => {
    expect(appliance.extraInfoHtml()).toContain('Instructions');
    expect(appliance.extraInfoHtml()).toContain('Warranty');

    expect(appliance.extraInfoHtml()).toContain(
      `<a href="images/appliance-instructions.png" target="_blank">`
    );

    expect(appliance.extraInfoHtml()).toContain(
      `<a href="images/appliance-warranty.png" target="_blank">`
    );
  });

});

describe('test suite: Product', () => {
  let product;

  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    });
  });

  it('has the correct properties', () => {
    // Note: you don't have to test all the properties.
    // You can just pick a few to test.
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87
    });
    expect(product.priceCents).toEqual(1090);
  });

  it('gets the stars url', () => {
    expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
  });

  it('gets the product price', () => {
    expect(product.getPrice()).toEqual('$10.90')
  })

  it('does not display any extra info', () => {
    expect(product.extraInfoHtml()).toEqual('');
  });
});

describe('test suite: Clothing', () => {
  let clothing;

  beforeEach(() => {
    clothing = new Clothing({
      id: "5968897c-4d27-4872-89f6-5bcb052746d7",
      image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
      name: "Women's Chiffon Beachwear Cover Up - Black",
      rating: {
        stars: 4.5,
        count: 235
      },
      priceCents: 2070,
      keywords: [
        "robe",
        "swimsuit",
        "swimming",
        "bathing",
        "apparel"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
  });

  it('has the correct properties', () => {
    // Note: you don't have to test all the properties.
    // You can just pick a few to test.
    expect(clothing.name).toEqual('Women\'s Chiffon Beachwear Cover Up - Black');
    expect(clothing.rating).toEqual({
      stars: 4.5,
      count: 235
    });
    expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
  });

  it('gets the stars url', () => {
    expect(clothing.getStarsUrl()).toEqual('images/ratings/rating-45.png');
  });

  it('gets the product price', () => {
    expect(clothing.getPrice()).toEqual('$20.70')
  })

  it('display any extra info', () => {
    expect(clothing.extraInfoHtml()).toContain(
      `<a href="images/clothing-size-chart.png" target="_blank">`
    );

    expect(clothing.extraInfoHtml()).toContain('Size chart');
  });

});