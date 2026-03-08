import json

products = [
    # Beverages
    {"upc": "012000001086", "name": "Pepsi Cola 2L", "brand": "Pepsi", "category": "Soft Drinks", "hs_code": "2202.10.00", "origin_country": "US", "price_cad": 3.49},
    {"upc": "049000028911", "name": "Coca-Cola 2L", "brand": "Coca-Cola", "category": "Soft Drinks", "hs_code": "2202.10.00", "origin_country": "US", "price_cad": 3.49},
    {"upc": "012000030178", "name": "Mountain Dew 2L", "brand": "Pepsi", "category": "Soft Drinks", "hs_code": "2202.10.00", "origin_country": "US", "price_cad": 3.49},
    {"upc": "048500017753", "name": "Tropicana Orange Juice 1.75L", "brand": "Tropicana", "category": "Fruit Juice", "hs_code": "2009.12.00", "origin_country": "US", "price_cad": 7.99},
    {"upc": "025000056826", "name": "Minute Maid Orange Juice 1.75L", "brand": "Minute Maid", "category": "Fruit Juice", "hs_code": "2009.12.00", "origin_country": "US", "price_cad": 7.49},
    {"upc": "018200435601", "name": "Ocean Spray Cranberry Juice 1.5L", "brand": "Ocean Spray", "category": "Fruit Juice", "hs_code": "2009.89.00", "origin_country": "US", "price_cad": 6.99},
    {"upc": "082666895404", "name": "Budweiser 24-pack", "brand": "Budweiser", "category": "Beer", "hs_code": "2203.00.00", "origin_country": "US", "price_cad": 49.99},
    {"upc": "018200334690", "name": "Coors Light 24-pack", "brand": "Coors", "category": "Beer", "hs_code": "2203.00.00", "origin_country": "US", "price_cad": 49.99},
    {"upc": "080686100630", "name": "Jack Daniels Whiskey 750ml", "brand": "Jack Daniels", "category": "Spirits & Liquor", "hs_code": "2208.30.00", "origin_country": "US", "price_cad": 44.95},
    {"upc": "085592100101", "name": "Jim Beam Bourbon 750ml", "brand": "Jim Beam", "category": "Spirits & Liquor", "hs_code": "2208.30.00", "origin_country": "US", "price_cad": 34.95},

    # Food
    {"upc": "051000012517", "name": "Campbell's Tomato Soup 540ml", "brand": "Campbell's", "category": "Soups", "hs_code": "2104.10.00", "origin_country": "US", "price_cad": 2.49},
    {"upc": "051000024435", "name": "Campbell's Chicken Noodle Soup", "brand": "Campbell's", "category": "Soups", "hs_code": "2104.10.00", "origin_country": "US", "price_cad": 2.49},
    {"upc": "037600103527", "name": "Heinz Ketchup 1L", "brand": "Heinz", "category": "Sauces & Condiments", "hs_code": "2103.20.00", "origin_country": "US", "price_cad": 5.99},
    {"upc": "013000006408", "name": "Kraft Peanut Butter 1kg", "brand": "Kraft", "category": "Prepared Nuts & Fruit", "hs_code": "2008.11.00", "origin_country": "US", "price_cad": 9.99},
    {"upc": "043000200650", "name": "Kraft Macaroni & Cheese", "brand": "Kraft", "category": "Food Preparations", "hs_code": "2106.90.00", "origin_country": "US", "price_cad": 2.29},
    {"upc": "016000275287", "name": "General Mills Cheerios 520g", "brand": "General Mills", "category": "Breakfast Cereals", "hs_code": "1904.10.00", "origin_country": "US", "price_cad": 7.49},
    {"upc": "038000291210", "name": "Kellogg's Corn Flakes 680g", "brand": "Kellogg's", "category": "Breakfast Cereals", "hs_code": "1904.10.00", "origin_country": "US", "price_cad": 6.99},
    {"upc": "016000126305", "name": "Nature Valley Granola Bars", "brand": "General Mills", "category": "Breakfast Cereals", "hs_code": "1904.20.00", "origin_country": "US", "price_cad": 5.99},
    {"upc": "044000030643", "name": "Oreo Cookies 500g", "brand": "Nabisco", "category": "Bread & Baked Goods", "hs_code": "1905.31.00", "origin_country": "US", "price_cad": 6.49},
    {"upc": "028400090179", "name": "Doritos Nacho Chips 275g", "brand": "Frito-Lay", "category": "Food Preparations", "hs_code": "2106.90.00", "origin_country": "US", "price_cad": 5.49},
    {"upc": "028400090032", "name": "Lay's Classic Chips 235g", "brand": "Frito-Lay", "category": "Food Preparations", "hs_code": "2106.90.00", "origin_country": "US", "price_cad": 5.49},
    {"upc": "040000488422", "name": "M&M's 400g", "brand": "Mars", "category": "Candy & Confectionery", "hs_code": "1704.90.00", "origin_country": "US", "price_cad": 7.99},
    {"upc": "034000002603", "name": "Reese's Peanut Butter Cups", "brand": "Hershey's", "category": "Chocolate", "hs_code": "1806.32.00", "origin_country": "US", "price_cad": 3.49},
    {"upc": "076840102004", "name": "Hershey's Chocolate Bar 100g", "brand": "Hershey's", "category": "Chocolate", "hs_code": "1806.32.00", "origin_country": "US", "price_cad": 3.29},
    {"upc": "011110813602", "name": "Quaker Oats 2kg", "brand": "Quaker", "category": "Breakfast Cereals", "hs_code": "1904.20.00", "origin_country": "US", "price_cad": 8.99},
    {"upc": "017000090536", "name": "French's Yellow Mustard 750ml", "brand": "French's", "category": "Sauces & Condiments", "hs_code": "2103.30.00", "origin_country": "US", "price_cad": 4.49},
    {"upc": "021130126026", "name": "Hidden Valley Ranch Dressing", "brand": "Hidden Valley", "category": "Sauces & Condiments", "hs_code": "2103.90.00", "origin_country": "US", "price_cad": 5.99},
    {"upc": "041196010019", "name": "Aunt Jemima Pancake Syrup 750ml", "brand": "Aunt Jemima", "category": "Jams & Jellies", "hs_code": "2007.99.00", "origin_country": "US", "price_cad": 6.49},
    {"upc": "015400850278", "name": "Uncle Ben's Long Grain Rice 2kg", "brand": "Uncle Ben's", "category": "Food Preparations", "hs_code": "2106.90.00", "origin_country": "US", "price_cad": 7.99},

    # Household & Cleaning
    {"upc": "037000291497", "name": "Tide Original Laundry Detergent 1.47L", "brand": "Tide", "category": "Cleaning Products", "hs_code": "3402.20.00", "origin_country": "US", "price_cad": 14.99},
    {"upc": "037000866077", "name": "Febreze Air Freshener 250ml", "brand": "Febreze", "category": "Cleaning Products", "hs_code": "3307.49.00", "origin_country": "US", "price_cad": 5.99},
    {"upc": "037000919650", "name": "Dawn Dish Soap 638ml", "brand": "Dawn", "category": "Cleaning Products", "hs_code": "3402.20.00", "origin_country": "US", "price_cad": 4.99},
    {"upc": "019200813055", "name": "Windex Glass Cleaner 765ml", "brand": "Windex", "category": "Cleaning Products", "hs_code": "3402.90.00", "origin_country": "US", "price_cad": 5.49},
    {"upc": "036000291452", "name": "Bounty Paper Towels 8-pack", "brand": "Bounty", "category": "Paper", "hs_code": "4818.20.00", "origin_country": "US", "price_cad": 16.99},
    {"upc": "030772012345", "name": "Colgate Total Toothpaste 170ml", "brand": "Colgate", "category": "Dental Products", "hs_code": "3306.10.00", "origin_country": "US", "price_cad": 4.99},
    {"upc": "037000803430", "name": "Crest 3D White Toothpaste 116ml", "brand": "Crest", "category": "Dental Products", "hs_code": "3306.10.00", "origin_country": "US", "price_cad": 5.49},
    {"upc": "022200007128", "name": "Gillette Mach3 Razors 4-pack", "brand": "Gillette", "category": "Cleaning Products", "hs_code": "8212.20.00", "origin_country": "US", "price_cad": 14.99},

    # Clothing & Footwear
    {"upc": "088676139901", "name": "Levi's 501 Jeans", "brand": "Levi's", "category": "Men's Pants & Jeans", "hs_code": "6203.42.00", "origin_country": "US", "price_cad": 89.99},
    {"upc": "194501258281", "name": "Nike Air Max Sneakers", "brand": "Nike", "category": "Sports Shoes / Sneakers", "hs_code": "6402.91.00", "origin_country": "US", "price_cad": 159.99},
    {"upc": "191886832323", "name": "Adidas Running Shoes", "brand": "Adidas", "category": "Sports Shoes / Sneakers", "hs_code": "6402.91.00", "origin_country": "US", "price_cad": 129.99},

    # Auto Parts
    {"upc": "070273523019", "name": "Castrol 5W-30 Motor Oil 5L", "brand": "Castrol", "category": "Auto Parts", "hs_code": "2710.19.00", "origin_country": "US", "price_cad": 29.99},
    {"upc": "085387063394", "name": "Pennzoil 5W-30 Motor Oil 5L", "brand": "Pennzoil", "category": "Auto Parts", "hs_code": "2710.19.00", "origin_country": "US", "price_cad": 27.99},

    # Electronics
    {"upc": "194252460672", "name": "Apple USB-C Cable 1m", "brand": "Apple", "category": "Wiring & Cables", "hs_code": "8544.42.00", "origin_country": "US", "price_cad": 29.99},
    {"upc": "745883741946", "name": "Energizer AA Batteries 16-pack", "brand": "Energizer", "category": "Batteries", "hs_code": "8506.10.00", "origin_country": "US", "price_cad": 16.99},
    {"upc": "039800104595", "name": "Duracell AA Batteries 16-pack", "brand": "Duracell", "category": "Batteries", "hs_code": "8506.10.00", "origin_country": "US", "price_cad": 17.99},

    # Furniture
    {"upc": "043003826271", "name": "IKEA LACK Side Table", "brand": "IKEA", "category": "Other Furniture", "hs_code": "9403.30.00", "origin_country": "US", "price_cad": 19.99},
]

with open("seeds/products.json", "w") as f:
    json.dump(products, f, indent=2)

print(f"✅ Saved {len(products)} products to seeds/products.json")

from collections import Counter
categories = Counter(p["category"] for p in products)
print("\nProducts by category:")
for cat, count in sorted(categories.items()):
    print(f"  {cat}: {count}")