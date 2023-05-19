import { StyleSheet, View, Text, Image, FlatList, useWindowDimensions, ScrollView, 
Pressable, 
TouchableHighlight} from "react-native";
import products from "../data/products";
import { useSelector, useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";

const ProductDetailsScreen = ({route}) => {
  const id = route.params.id;
  const product = useSelector(state => state.products.selectedProduct);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({product}));
  };

  console.log(id);

  if (!product) {
    return null;
  }

  return (
    <View>
        <ScrollView>
      {/* Image Carousel */}
      <FlatList
        data={product.images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width, aspectRatio: 1, marginTop: 20 }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />

    <View style={{ padding: 20 }}>
      {/* Title */}
      <Text style={styles.title}>{product.name}</Text>

      {/* Price */}
      <Text style={styles.price}>$ {product.price}</Text>

      {/* Description */}
      <Text style={styles.description}>{product.description}</Text>
    </View>
    </ScrollView>

      {/* Add to cart button */}
      <TouchableHighlight onPress= {addToCart} style={styles.button} underlayColor={'lightgray'} >
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableHighlight>

      {/* Navigation icon */}
    </View>
  );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: '500',
        marginVertical: 10,
    },  
    price: {
        fontWeight: '500',
        fontSize: 16,
        letterSpacing: 1.5,
    },
    description: {
        marginVertical: 10,
        fontSize: 18,
        lineHeight: 30,
        fontWeight: '300',
    },
    button: {
        position: "absolute",
        backgroundColor: "black",
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
});

export default ProductDetailsScreen;
