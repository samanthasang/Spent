export const checkAndAddTags = (cartItems, cartItemToAdd) => {
  //   const existingCartItem = cartItems.find(
  //     (cartItem) => cartItem.id !== cartItemToAdd.id
  //   );
  const existingCartItem = true;

  console.log(cartItemToAdd);
  console.log(cartItems);
  if (cartItems) {
    return cartItems.map((cartItem) =>
      cartItem.id !== cartItemToAdd.id
        ? {
            ...cartItem,
            cartItemToAdd,
          }
        : {
            ...cartItem,
          }
    );
  }
  return [...cartItems, cartItemToAdd];
};
