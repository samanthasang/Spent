export const checkAndDeleteRecord = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove
  );

  if (existingCartItem) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove);
  }
  return [...cartItems];
};
export const editRecord = (cartItems, cartItemToAdd) => {
  console.log(cartItemToAdd);
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    console.log(cartItems);
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? {
            ...cartItem,
            name: cartItemToAdd.name,
            price: cartItemToAdd.price,
            date: cartItemToAdd.date,
            number: cartItemToAdd.number,
            cattegory: cartItemToAdd.cattegory,
            tags: cartItemToAdd.tags,
            description: cartItemToAdd.description,
          }
        : {
            ...cartItem,
          }
    );
  } else {
    cartItems.push(cartItemToAdd);
  }
  return [...cartItems];
};
export const editTagAndCatt = (cartItems, cartItemToAdd) => {
  console.log(cartItemToAdd);
  console.log(cartItems);
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    console.log(cartItems);
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? {
            ...cartItem,
            text: cartItemToAdd.text,
            value: cartItemToAdd.value,
          }
        : {
            ...cartItem,
          }
    );
  } else {
    cartItems.push(cartItemToAdd);
  }
  return [...cartItems];
};
export const searchDate = (cartItems, dateStart, dateEnd) => {
  console.log(cartItems);
  let items = [];
  const existingCartItem = dateStart !== dateEnd ? true : false;

  if (existingCartItem) {
    console.log(cartItems);
    cartItems.map(
      (cartItem) =>
        cartItem.date > dateStart &&
        cartItem.date < dateEnd &&
        items.push(cartItem)
      // console.log(cartItem.date + " " + dateStart + " " + dateEnd)
    );
  } else {
    cartItems.map(
      (cartItem) => cartItem.date === dateStart && items.push(cartItem)
      // console.log(cartItem.date + " " + dateStart + " " + dateEnd)
    );
  }
  console.log(items);
  return items;
};
