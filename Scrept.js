// JavaScript code for the restaurant website

// Global variable to store the cart items
let cartItems = [];

// getMenu() function
function getMenu() {
  fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
    .then(response => response.json())
    .then(data => {
      const menuContainer = document.querySelector('.menu-container');

      data.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;

        const itemName = document.createElement('h2');
        itemName.textContent = item.name;

        const itemDescription = document.createElement('p');
        itemDescription.textContent = item.description;

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart-btn');
        addToCartButton.textContent = 'Add to Cart';

        // Add click event listener to the "Add to Cart" button
        addToCartButton.addEventListener('click', () => {
          addToCart(item);
        });

        menuItem.appendChild(itemImage);
        menuItem.appendChild(itemName);
        menuItem.appendChild(itemDescription);
        menuItem.appendChild(addToCartButton);

        menuContainer.appendChild(menuItem);
      });
    })
    .catch(error => {
      console.log('Error fetching menu:', error);
    });
}

// addToCart() function
function addToCart(item) {
  // Add item to the cart
  cartItems.push(item);

  // Update the cart in the sidebar
  updateCart();
}

// removeCartItem() function
function removeCartItem(index) {
  // Remove item from the cart
  cartItems.splice(index, 1);

  // Update the cart in the sidebar
  updateCart();
}

// updateCart() function
function updateCart() {
  const cartItemsElement = document.querySelector('.cart-items');
  cartItemsElement.innerHTML = '';

  // Create a new list item for each cart item
  cartItems.forEach((item, index) => {
    const cartItem = document.createElement('li');
    cartItem.textContent = item.name;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-btn');
    removeButton.textContent = 'Remove';

    // Add click event listener to the "Remove" button
    removeButton.addEventListener('click', () => {
      removeCartItem(index);
    });

    cartItem.appendChild(removeButton);
    cartItemsElement.appendChild(cartItem);
  });
}

// toggleSidebar() function
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');

  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}

// handleCheckout() function
function handleCheckout() {
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
  } else {
    const statusElement = document.getElementById('status');
    const paymentElement = document.getElementById('payment');

    statusElement.textContent = 'Processing';

    // Simulate processing and updating payment status after 2 seconds
    setTimeout(() => {
      statusElement.textContent = 'Completed';
      paymentElement.textContent = 'Paid';
    }, 2000);
  }
}

// Initialize the restaurant website
function init() {
  getMenu();

  const cartBtn = document.querySelector('.cart-btn');
  const trackOrderBtn = document.querySelector('.track-order-btn');
  const closeBtn = document.querySelector('.close-btn');
  const checkoutBtn = document.querySelector('#checkout-btn');
  const overlay = document.querySelector('.overlay');

  cartBtn.addEventListener('click', toggleSidebar);
  trackOrderBtn.addEventListener('click', toggleSidebar);
  closeBtn.addEventListener('click', toggleSidebar);
  checkoutBtn.addEventListener('click', handleCheckout);
  overlay.addEventListener('click', toggleSidebar);
}

// Call the init() function to initialize the restaurant website
init();
