import json

# Maps the first 4 digits of an HS code to a plain English category
hs_to_category = {
    # Food & Beverages
    "0201": "Beef",
    "0202": "Beef (Frozen)",
    "0203": "Pork",
    "0207": "Poultry",
    "0210": "Meat (Preserved)",
    "0301": "Live Fish",
    "0302": "Fresh Fish",
    "0303": "Frozen Fish",
    "0401": "Milk & Cream",
    "0402": "Dairy Products",
    "0405": "Butter",
    "0406": "Cheese",
    "0701": "Vegetables",
    "0702": "Tomatoes",
    "0703": "Onions & Garlic",
    "0805": "Citrus Fruit",
    "0806": "Grapes",
    "0808": "Apples & Pears",
    "0901": "Coffee",
    "0902": "Tea",
    "1001": "Wheat",
    "1005": "Corn",
    "1101": "Wheat Flour",
    "1507": "Soybean Oil",
    "1509": "Olive Oil",
    "1601": "Sausages",
    "1602": "Prepared Meat",
    "1701": "Sugar",
    "1704": "Candy & Confectionery",
    "1801": "Cocoa",
    "1806": "Chocolate",
    "1901": "Malt Extract / Infant Food",
    "1902": "Pasta",
    "1904": "Breakfast Cereals",
    "1905": "Bread & Baked Goods",
    "2001": "Pickled Vegetables",
    "2002": "Tomato Products",
    "2005": "Canned Vegetables",
    "2007": "Jams & Jellies",
    "2008": "Prepared Nuts & Fruit",
    "2009": "Fruit Juice",
    "2101": "Coffee & Tea Extracts",
    "2103": "Sauces & Condiments",
    "2104": "Soups",
    "2105": "Ice Cream",
    "2106": "Food Preparations",
    "2201": "Water & Ice",
    "2202": "Soft Drinks",
    "2203": "Beer",
    "2204": "Wine",
    "2205": "Vermouth",
    "2208": "Spirits & Liquor",
    "2401": "Tobacco",

    # Household & Consumer Goods
    "3301": "Essential Oils / Perfume",
    "3401": "Soap",
    "3402": "Cleaning Products",
    "3404": "Artificial Wax",
    "3406": "Candles",
    "3407": "Dental Products",
    "3808": "Pesticides",
    "3824": "Chemical Preparations",
    "3901": "Plastics",
    "3924": "Plastic Household Items",
    "3926": "Plastic Products",
    "4011": "Tires",
    "4016": "Rubber Products",
    "4202": "Luggage & Bags",
    "4203": "Leather Clothing",
    "4301": "Furs",
    "4407": "Lumber & Wood",
    "4418": "Wood Furniture Parts",
    "4801": "Newsprint",
    "4802": "Paper",
    "4819": "Cardboard Boxes",
    "4901": "Books",
    "4902": "Newspapers & Magazines",

    # Clothing & Footwear
    "5101": "Wool",
    "5201": "Cotton",
    "6101": "Knit Outerwear",
    "6102": "Women's Coats",
    "6103": "Men's Suits",
    "6104": "Women's Suits",
    "6105": "Men's Shirts",
    "6106": "Women's Blouses",
    "6109": "T-Shirts",
    "6110": "Sweaters & Hoodies",
    "6111": "Baby Clothing",
    "6201": "Men's Jackets",
    "6202": "Women's Jackets",
    "6203": "Men's Pants & Jeans",
    "6204": "Women's Pants & Skirts",
    "6401": "Waterproof Footwear",
    "6402": "Sports Shoes / Sneakers",
    "6403": "Leather Footwear",
    "6404": "Textile Footwear",

    # Electronics & Appliances
    "8415": "Air Conditioners",
    "8418": "Refrigerators & Freezers",
    "8421": "Dishwashers / Filters",
    "8422": "Dishwashers",
    "8443": "Printers",
    "8450": "Washing Machines",
    "8451": "Dryers",
    "8469": "Office Machines",
    "8471": "Computers",
    "8473": "Computer Parts",
    "8481": "Taps & Valves",
    "8501": "Electric Motors",
    "8504": "Transformers",
    "8507": "Batteries",
    "8517": "Phones & Telecom",
    "8518": "Speakers & Microphones",
    "8519": "Audio Equipment",
    "8521": "Video Equipment",
    "8523": "Storage Media",
    "8525": "Cameras & Broadcasting",
    "8528": "TVs & Monitors",
    "8544": "Wiring & Cables",

    # Automotive
    "8701": "Tractors",
    "8702": "Buses",
    "8703": "Passenger Cars",
    "8704": "Trucks",
    "8706": "Vehicle Chassis",
    "8707": "Vehicle Bodies",
    "8708": "Auto Parts",
    "8711": "Motorcycles",
    "8714": "Bike & Motorcycle Parts",

    # Steel & Metals (your existing data)
    "7206": "Steel (Ingots)",
    "7207": "Steel (Semi-finished)",
    "7208": "Steel (Flat-rolled, hot)",
    "7209": "Steel (Flat-rolled, cold)",
    "7210": "Steel (Coated)",
    "7213": "Steel (Bars & Rods)",
    "7214": "Steel (Bars)",
    "7216": "Steel (Angles & Sections)",
    "7217": "Steel (Wire)",
    "7219": "Stainless Steel (Flat)",
    "7222": "Stainless Steel (Bars)",
    "7225": "Alloy Steel (Flat)",
    "7228": "Alloy Steel (Bars)",
    "7301": "Steel (Sheet Piling)",
    "7304": "Steel (Pipes, Seamless)",
    "7306": "Steel (Pipes, Welded)",
    "7308": "Steel (Structures)",
    "7317": "Steel (Nails)",
    "7318": "Steel (Screws & Bolts)",
    "7320": "Steel (Springs)",
    "7323": "Steel (Kitchen Articles)",
    "7326": "Steel (Other Articles)",

    # Aluminum
    "7601": "Aluminum (Unwrought)",
    "7604": "Aluminum (Bars & Rods)",
    "7606": "Aluminum (Plates & Sheets)",
    "7608": "Aluminum (Tubes & Pipes)",
    "7610": "Aluminum (Structures)",
    "7615": "Aluminum (Household Articles)",
    "7616": "Aluminum (Other Articles)",

    # Furniture & Home
    "9401": "Chairs & Seats",
    "9402": "Medical Furniture",
    "9403": "Other Furniture",
    "9404": "Mattresses",
    "9405": "Lamps & Lighting",

    # Toys & Sports
    "9501": "Toys",
    "9502": "Dolls",
    "9503": "Games & Toys",
    "9506": "Sports Equipment",
    "9507": "Fishing Equipment",
}

def get_category(hs_code: str) -> str:
    """Look up category from a full HS code like '7206.10.00'"""
    prefix = hs_code.replace(".", "")[:4]
    return hs_to_category.get(prefix, "Other")

# Save the mapping to JSON
with open("hs_to_category.json", "w") as f:
    json.dump(hs_to_category, f, indent=2)

print(f"✅ Saved {len(hs_to_category)} HS category mappings to hs_to_category.json")

# Bonus: enrich your existing tariffs.json with category names
print("\nEnriching tariffs.json with categories...")
with open("tariffs.json", "r") as f:
    tariffs = json.load(f)

for item in tariffs:
    item["category"] = get_category(item["hs_code"])

with open("seeds/tariffs.json", "w") as f:
    json.dump(tariffs, f, indent=2)

print(f"✅ Updated seeds/tariffs.json — all {len(tariffs)} entries now have a category field")