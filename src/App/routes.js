const ROUTES = {
  newPlanRoute: () => "/plan/new",
  planRoute: (id) => `/plans/${id}`,
  plansRoute: () => "/plans",
  newShoppingList: () => "/shoppings/new",
  shoppingSelectedRoute: (id) => `/shopping/${id}`,
  shoppingListRoute: () => "/shopping",
};

export default ROUTES;
