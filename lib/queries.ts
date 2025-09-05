/*
Non-hidden items by category

const catQuery = getCategoryItems("cat");
const cats = await client.fetch(catQuery);
returns array of title, description, mainImage, and images of each item in the cat

categories: shoes, bags, clothing, sketches, ibi, other
*/
export const getCategoryItems = (category: string) => `
  *[_type == "photo" && hide == false && category == "${category}"]{
    _id,
    title,
    description,
    mainImage{
      asset->{
        _id,
        url
      }
    },
    images[]{
        asset->{
          _id,
          url
        }
    }
  }
`;


/*
Non-hidden items from multiple categories

const catQuery = getMultiCategoryItems("cat");
const mCats = await client.fetch(catsQuery);
returns array of title, description, mainImage, and images of each item in the different categories

categories: shoes, bags, clothing, sketches, ibi, other
*/
export const getMultiCategoryItems = (categories: string[]) => `
  *[_type == "photo" && hide == false && category in [${categories.map(c => `"${c}"`).join(", ")}]]{
    _id,
    title,
    description,
    mainImage{
      asset->{
        _id,
        url
      }
    },
    images[]{
        asset->{
          _id,
          url
        }
    }
  }
`;