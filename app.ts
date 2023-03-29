const express = require('express');
const fs = require('fs');

const logger = require('./logger');

const app = express();
const port = 3000;

const PRODUCT_ROUTE_V1 = '/api/v1/products';
const PRODUCT_ROUTE_BY_ID_V1 = '/api/v1/products/:id';

const USER_ROUTE_V1 = '/api/v1/users';
const USER_ROUTE_BY_ID_V1 = '/api/v1/users/:id';


// INTERFACES--------------------------------------------------------------------------

interface TimeInfo {
  readonly createdAt: Date | number | string;
  updatedAt: Date | number | string;
  deletedAt: Date | number | string;
};

interface Product {
  id: number;
  name: string;
  purchasePrice: number;
  tradePrice: number;
  brand: string;
  category: string;
  quantityStock: number;
  lowStockWarning: number;
  timeInfo: TimeInfo
};
// ---------------------------------------------------------------------------------------

// MOCKED DATA--------------------------------------------------------------------------

const mockedProducts: Product[] = [
  {
    id: 1,
    name: "skol 600",
    purchasePrice: 5.25,
    tradePrice: 10.00,
    brand: "skol",
    category: "beer",
    quantityStock: 45,
    lowStockWarning: 20,
    timeInfo: {
      createdAt: new Date(),
      updatedAt: 0,
      deletedAt: 0
    }
  },
  {
    id: 2,
    name: "skol 1L",
    purchasePrice: 4.25,
    tradePrice: 10.00,
    brand: "skol",
    category: "beer",
    quantityStock: 45,
    lowStockWarning: 20,
    timeInfo: {
      createdAt: new Date(),
      updatedAt: 0,
      deletedAt: 0
    }
  },
  {
    id: 3,
    name: "itaipava 600",
    purchasePrice: 5.25,
    tradePrice: 10.00,
    brand: "itaipava",
    category: "beer",
    quantityStock: 60,
    lowStockWarning: 20,
    timeInfo: {
      createdAt: new Date(),
      updatedAt: 0,
      deletedAt: 0
    }
  },
  {  
    id: 4,
    name: "itaipava lata",
    purchasePrice: 2.25,
    tradePrice: 5.00,
    brand: "skol",
    category: "beer",
    quantityStock: 45,
    lowStockWarning: 20,
    timeInfo: {
      createdAt: new Date(),
      updatedAt: 0,
      deletedAt: 0
    }
  },
  {  
    id: 5,
    name: "coca-cola lata",
    purchasePrice: 3.00,
    tradePrice: 5.00,
    brand: "coca-cola",
    category: "refrigerante",
    quantityStock: 100,
    lowStockWarning: 30,
    timeInfo: {
      createdAt: new Date(),
      updatedAt: 0,
      deletedAt: 0
    }
  }
];
// ---------------------------------------------------------------------------------------

// MIDDLEWARE'S--------------------------------------------------------------------------
app.use(express.json());
app.use(logger('dev'));
// ---------------------------------------------------------------------------------------


// FUNCTIONS HTTPS------------------------------------------------------------------------
const getAllProducts = (req: any, res: any): void => {

  res.status(200).json({
    status: 'success',
    size: mockedProducts.length,
    data: {
      products: mockedProducts,
    }
  });
};

const getProductById = (req: any, res: any): void => {

  const id = parseInt(req.params.id, 10);

  const found: Product | undefined = mockedProducts.find(el => el.id === id);

  if(!found) {
    res.status(404).json({
      status: "not found",
      message: `Product with ID ${id} not found!`
    });
  };

  res.status(200).json({
    status: "success",
    data: {
      product: found
    }
  });
};

const createProduct = (req: any, res: any): void => {

  const newId = mockedProducts.length + 1;
  
  mockedProducts.push(Object.assign({
    id: newId
  }, req.body));

  res.status(200).json({
    status: "success",
    data: {
      message: "Product created with success!"
    }
  });
};

const updateProductById = (req: any, res: any): void => {
  const id = parseInt(req.params.id, 10);
  const found: Product | undefined = mockedProducts.find(el => el.id === id);

  if(!found) {
    res.status(404).json({
      status: "not found",
      data: {
        message: `Product with ID ${id} not found!`
      }
    })
  };

  res.status(200).json({
    status: "success",
    data: {
      message: `Product with ID ${id} updated with success!`
    }
  });
};

const deleteProductById = (req: any, res: any): void => {
  const id = parseInt(req.params.id, 10);
  const found: Product | undefined = mockedProducts.find(el => el.id === id);

  if(!found) {
    res.status(404).json({
      status: "not found",
      data: {
        message: `Product with ID ${id} not found!`
      }
    })
  };

  res.status(204).json({
    status: "success",
    data: null
  });
};

const getAllUsers = (req: any, res: any): void => {

  res.status(200).json({
    status: "success",
    data: {
      users: []
    }
  });
};

const createUser = (req: any, res: any): void => {

  res.status(200).json({
    status: "success",
    data: {
      message: ""
    }
  });
};

const getUserById = (req: any, res: any): void => {
  const id = parseInt(req.params.id, 10);
  const found = mockedProducts.find(el => el.id === id);

  if(!found) {
    res.status(404).json({
      status: "not found",
      data: {
        message: `User with ID ${id} not found!`
      }
    })
  };

  res.status(200).json({
    status: "success",
    data: {
      user: {}
    }
  });
};

const updateUserById = (req: any, res: any): void => {
  const id = parseInt(req.params.id, 10);
  const found: Product | undefined = mockedProducts.find(el => el.id === id);

  if(!found) {
    res.status(404).json({
      status: "not found",
      data: {
        message: `User with ID ${id} not found!`
      }
    })
  };

  res.status(200).json({
    status: "success",
    data: {
      message: ''
    }
  });
};

const deleteUserById = (req: any, res: any): void => {
  const id = parseInt(req.params.id, 10);
  const found: Product | undefined = mockedProducts.find(el => el.id === id);

  if(!found) {
    res.status(404).json({
      status: "not found",
      data: {
        message: `User with ID ${id} not found!`
      }
    })
  };

  res.status(204).json({
    status: "success",
    data: null
  });
};

// ---------------------------------------------------------------------------------------

// ROUTE: PRODUCTS------------------------------------------------------------------------
app
  .route(PRODUCT_ROUTE_V1)
  .get(getAllProducts)
  .post(createProduct);

app
  .route(PRODUCT_ROUTE_BY_ID_V1)
  .get(getProductById)
  .patch(updateProductById)
  .delete(deleteProductById);

// ---------------------------------------------------------------------------------------

// ROUTE: USERS--------------------------------------------------------------------------
app
  .route(USER_ROUTE_V1)
  .get(getAllUsers)
  .post(createUser);

app
  .route(USER_ROUTE_BY_ID_V1)
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

// ---------------------------------------------------------------------------------------

app.listen(port, (): void => {
  console.log(`App running in port ${port}...`);
});
