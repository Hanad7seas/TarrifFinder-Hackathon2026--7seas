import json

# Canadian alternatives for each product category
# These are real Canadian brands that replace US-tariffed products

alternatives = [
    # Soft Drinks
    {"category": "Soft Drinks", "original_brand": "Pepsi", "alt_name": "PC Cola 2L", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 2.49, "is_canadian": True},
    {"category": "Soft Drinks", "original_brand": "Coca-Cola", "alt_name": "Crush Orange Soda", "alt_brand": "Crush (Canadian-made)", "alt_origin": "Canada", "alt_price_cad": 2.49, "is_canadian": True},
    {"category": "Soft Drinks", "original_brand": "Mountain Dew", "alt_name": "Clearly Canadian Sparkling Water", "alt_brand": "Clearly Canadian", "alt_origin": "Canada", "alt_price_cad": 2.99, "is_canadian": True},

    # Fruit Juice
    {"category": "Fruit Juice", "original_brand": "Tropicana", "alt_name": "Oasis Orange Juice 1.75L", "alt_brand": "Oasis", "alt_origin": "Canada", "alt_price_cad": 6.99, "is_canadian": True},
    {"category": "Fruit Juice", "original_brand": "Minute Maid", "alt_name": "PC Orange Juice 1.75L", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 5.99, "is_canadian": True},
    {"category": "Fruit Juice", "original_brand": "Ocean Spray", "alt_name": "Northland Cranberry Cocktail", "alt_brand": "Northland", "alt_origin": "Canada", "alt_price_cad": 5.49, "is_canadian": True},

    # Beer
    {"category": "Beer", "original_brand": "Budweiser", "alt_name": "Molson Canadian 24-pack", "alt_brand": "Molson", "alt_origin": "Canada", "alt_price_cad": 46.99, "is_canadian": True},
    {"category": "Beer", "original_brand": "Coors", "alt_name": "Labatt Blue 24-pack", "alt_brand": "Labatt", "alt_origin": "Canada", "alt_price_cad": 46.99, "is_canadian": True},
    {"category": "Beer", "original_brand": "Budweiser", "alt_name": "Steam Whistle Pilsner 24-pack", "alt_brand": "Steam Whistle", "alt_origin": "Canada", "alt_price_cad": 52.99, "is_canadian": True},

    # Spirits & Liquor
    {"category": "Spirits & Liquor", "original_brand": "Jack Daniels", "alt_name": "Crown Royal Whisky 750ml", "alt_brand": "Crown Royal", "alt_origin": "Canada", "alt_price_cad": 39.95, "is_canadian": True},
    {"category": "Spirits & Liquor", "original_brand": "Jim Beam", "alt_name": "Canadian Club Whisky 750ml", "alt_brand": "Canadian Club", "alt_origin": "Canada", "alt_price_cad": 29.95, "is_canadian": True},
    {"category": "Spirits & Liquor", "original_brand": "Jack Daniels", "alt_name": "Gibson's Finest Whisky 750ml", "alt_brand": "Gibson's", "alt_origin": "Canada", "alt_price_cad": 32.95, "is_canadian": True},

    # Soups
    {"category": "Soups", "original_brand": "Campbell's", "alt_name": "PC Tomato Soup 540ml", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 1.99, "is_canadian": True},
    {"category": "Soups", "original_brand": "Campbell's", "alt_name": "Habitant Pea Soup 796ml", "alt_brand": "Habitant", "alt_origin": "Canada", "alt_price_cad": 2.99, "is_canadian": True},

    # Sauces & Condiments
    {"category": "Sauces & Condiments", "original_brand": "Heinz", "alt_name": "PC Ketchup 1L", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 4.49, "is_canadian": True},
    {"category": "Sauces & Condiments", "original_brand": "French's", "alt_name": "Bick's Yellow Mustard 750ml", "alt_brand": "Bick's", "alt_origin": "Canada", "alt_price_cad": 3.49, "is_canadian": True},
    {"category": "Sauces & Condiments", "original_brand": "Hidden Valley", "alt_name": "Renée's Caesar Dressing", "alt_brand": "Renée's", "alt_origin": "Canada", "alt_price_cad": 5.49, "is_canadian": True},

    # Prepared Nuts & Fruit
    {"category": "Prepared Nuts & Fruit", "original_brand": "Kraft", "alt_name": "Squirrel Peanut Butter 1kg", "alt_brand": "Squirrel", "alt_origin": "Canada", "alt_price_cad": 8.99, "is_canadian": True},
    {"category": "Prepared Nuts & Fruit", "original_brand": "Kraft", "alt_name": "Smucker's Natural Peanut Butter 1kg", "alt_brand": "Smucker's (Canadian-made)", "alt_origin": "Canada", "alt_price_cad": 9.49, "is_canadian": True},

    # Food Preparations
    {"category": "Food Preparations", "original_brand": "Kraft", "alt_name": "PC Mac & Cheese Dinner", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 1.79, "is_canadian": True},
    {"category": "Food Preparations", "original_brand": "Frito-Lay", "alt_name": "Old Dutch Ripple Chips 235g", "alt_brand": "Old Dutch", "alt_origin": "Canada", "alt_price_cad": 4.99, "is_canadian": True},
    {"category": "Food Preparations", "original_brand": "Frito-Lay", "alt_name": "Covered Bridge Kettle Chips 200g", "alt_brand": "Covered Bridge", "alt_origin": "Canada", "alt_price_cad": 4.49, "is_canadian": True},

    # Breakfast Cereals
    {"category": "Breakfast Cereals", "original_brand": "General Mills", "alt_name": "PC Toasted Oat Cereal 520g", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 5.99, "is_canadian": True},
    {"category": "Breakfast Cereals", "original_brand": "Quaker", "alt_name": "Robin Hood Oats 2kg", "alt_brand": "Robin Hood", "alt_origin": "Canada", "alt_price_cad": 7.99, "is_canadian": True},
    {"category": "Breakfast Cereals", "original_brand": "Kellogg's", "alt_name": "PC Corn Flakes 680g", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 5.49, "is_canadian": True},

    # Bread & Baked Goods
    {"category": "Bread & Baked Goods", "original_brand": "Nabisco", "alt_name": "Dad's Cookies 500g", "alt_brand": "Dad's", "alt_origin": "Canada", "alt_price_cad": 5.49, "is_canadian": True},
    {"category": "Bread & Baked Goods", "original_brand": "Nabisco", "alt_name": "Dare Maple Leaf Cookies 500g", "alt_brand": "Dare", "alt_origin": "Canada", "alt_price_cad": 5.99, "is_canadian": True},

    # Candy & Confectionery
    {"category": "Candy & Confectionery", "original_brand": "Mars", "alt_name": "Maynards Sour Patch Kids 400g", "alt_brand": "Maynards", "alt_origin": "Canada", "alt_price_cad": 6.99, "is_canadian": True},
    {"category": "Candy & Confectionery", "original_brand": "Mars", "alt_name": "Kerr's Candy Mix 400g", "alt_brand": "Kerr's", "alt_origin": "Canada", "alt_price_cad": 6.49, "is_canadian": True},

    # Chocolate
    {"category": "Chocolate", "original_brand": "Hershey's", "alt_name": "Cadbury Dairy Milk 100g", "alt_brand": "Cadbury (Canadian-made)", "alt_origin": "Canada", "alt_price_cad": 2.99, "is_canadian": True},
    {"category": "Chocolate", "original_brand": "Hershey's", "alt_name": "Purdy's Milk Chocolate Bar", "alt_brand": "Purdy's", "alt_origin": "Canada", "alt_price_cad": 4.99, "is_canadian": True},

    # Cleaning Products
    {"category": "Cleaning Products", "original_brand": "Tide", "alt_name": "PC Free & Clear Laundry Detergent 1.47L", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 11.99, "is_canadian": True},
    {"category": "Cleaning Products", "original_brand": "Dawn", "alt_name": "PC Ultra Dish Soap 638ml", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 3.49, "is_canadian": True},
    {"category": "Cleaning Products", "original_brand": "Windex", "alt_name": "Vim Cream Cleanser 500ml", "alt_brand": "Vim", "alt_origin": "Canada", "alt_price_cad": 3.99, "is_canadian": True},

    # Dental Products
    {"category": "Dental Products", "original_brand": "Colgate", "alt_name": "PC Fluoride Toothpaste 170ml", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 2.99, "is_canadian": True},
    {"category": "Dental Products", "original_brand": "Crest", "alt_name": "Arm & Hammer Toothpaste 116ml", "alt_brand": "Arm & Hammer (Canadian-made)", "alt_origin": "Canada", "alt_price_cad": 4.49, "is_canadian": True},

    # Sports Shoes
    {"category": "Sports Shoes / Sneakers", "original_brand": "Nike", "alt_name": "Bauer Athletic Shoes", "alt_brand": "Bauer", "alt_origin": "Canada", "alt_price_cad": 119.99, "is_canadian": True},
    {"category": "Sports Shoes / Sneakers", "original_brand": "Adidas", "alt_name": "Kodiak Steel Toe Boots", "alt_brand": "Kodiak", "alt_origin": "Canada", "alt_price_cad": 109.99, "is_canadian": True},

    # Men's Pants & Jeans
    {"category": "Men's Pants & Jeans", "original_brand": "Levi's", "alt_name": "Buffalo David Bitton Jeans", "alt_brand": "Buffalo", "alt_origin": "Canada", "alt_price_cad": 79.99, "is_canadian": True},
    {"category": "Men's Pants & Jeans", "original_brand": "Levi's", "alt_name": "Western Rise Jeans", "alt_brand": "Reigning Champ", "alt_origin": "Canada", "alt_price_cad": 95.00, "is_canadian": True},

    # Batteries
    {"category": "Batteries", "original_brand": "Energizer", "alt_name": "PC AA Batteries 16-pack", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 11.99, "is_canadian": True},
    {"category": "Batteries", "original_brand": "Duracell", "alt_name": "Kirkland AA Batteries 48-pack", "alt_brand": "Kirkland (Costco Canada)", "alt_origin": "Canada", "alt_price_cad": 19.99, "is_canadian": True},

    # Auto Parts / Motor Oil
    {"category": "Auto Parts", "original_brand": "Castrol", "alt_name": "Petro-Canada PureEnergy 5W-30 5L", "alt_brand": "Petro-Canada", "alt_origin": "Canada", "alt_price_cad": 26.99, "is_canadian": True},
    {"category": "Auto Parts", "original_brand": "Pennzoil", "alt_name": "Petro-Canada Supreme 5W-30 5L", "alt_brand": "Petro-Canada", "alt_origin": "Canada", "alt_price_cad": 24.99, "is_canadian": True},

    # Jams & Jellies / Syrups
    {"category": "Jams & Jellies", "original_brand": "Aunt Jemima", "alt_name": "PC Pure Maple Syrup 540ml", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 9.99, "is_canadian": True},
    {"category": "Jams & Jellies", "original_brand": "Aunt Jemima", "alt_name": "Decacer Pure Maple Syrup 540ml", "alt_brand": "Decacer", "alt_origin": "Canada", "alt_price_cad": 11.99, "is_canadian": True},

    # Furniture
    {"category": "Other Furniture", "original_brand": "IKEA", "alt_name": "EQ3 Side Table", "alt_brand": "EQ3", "alt_origin": "Canada", "alt_price_cad": 49.00, "is_canadian": True},
    {"category": "Other Furniture", "original_brand": "IKEA", "alt_name": "Article Furniture Side Table", "alt_brand": "Article", "alt_origin": "Canada", "alt_price_cad": 59.00, "is_canadian": True},

    # Paper
    {"category": "Paper", "original_brand": "Bounty", "alt_name": "PC Paper Towels 8-pack", "alt_brand": "President's Choice", "alt_origin": "Canada", "alt_price_cad": 12.99, "is_canadian": True},
    {"category": "Paper", "original_brand": "Bounty", "alt_name": "Cascades Enviro Paper Towels 8-pack", "alt_brand": "Cascades", "alt_origin": "Canada", "alt_price_cad": 13.99, "is_canadian": True},

    # Wiring & Cables
    {"category": "Wiring & Cables", "original_brand": "Apple", "alt_name": "Mophie USB-C Cable 1m", "alt_brand": "Mophie (Canadian-sold)", "alt_origin": "Canada", "alt_price_cad": 24.99, "is_canadian": True},
    {"category": "Wiring & Cables", "original_brand": "Apple", "alt_name": "Belkin USB-C Cable 1m", "alt_brand": "Belkin (Canadian-made)", "alt_origin": "Canada", "alt_price_cad": 19.99, "is_canadian": True},
]

with open("seeds/alternatives.json", "w") as f:
    json.dump(alternatives, f, indent=2)

print(f"✅ Saved {len(alternatives)} alternatives to seeds/alternatives.json")

# Print summary
from collections import Counter
cats = Counter(a["category"] for a in alternatives)
print("\nAlternatives by category:")
for cat, count in sorted(cats.items()):
    print(f"  {cat}: {count} alternatives")