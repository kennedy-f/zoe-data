

# Zoe data

This library provides hooks to make your APIs calls.

Use [Axios](https://axios-http.com/) and receive axios params if you need 😉

Inspired by [Apollo Client](https://www.apollographql.com/docs/react/)


This package is under construction and this doc will be updated

## Installation

**Yarn**
```yarn
yarn add zoe-data
```

**NPM**

```npm
npm install --save zoe-data
```

## Hooks

All the hooks that modify data don't run at the moment they are created, for this use the fetch function they give to
you.

- [useGet](#useGet)
- usePost
- [useUpdate](#useUpdate)
- useDelete

All the hooks returns this, and they **fetch functions return the same except for the loading**.

Name | Type | Description 
| - | - | - | 
loading | boolean | Will be true when the request is running
error | object | Will be the error if the request fails 
data | object | Will be the data if the request succeeds 
status | number | Will be the status code of the response 
axiosOriginalResponse | object | Will be the axios response 
fetch | function | Will be the fetch function that you can use to fetch the data, the name will change by hook

### Example

```tsx
import React from "react";
import { useDelete, useGet, usePost, useUpdate } from "../main";
import { ApiConfigProvider } from "../main/context/ApiConfig/ApiConfig.provider";

interface ResponseData {
  id: number;
  name: string;
}

interface RequestVars {
  name: string;
}

export function AllHooksExample() {
  const { data, loading, status, error, axiosOriginalResponse, refetch } =
    useGet<ResponseData>("/user");

  const { fetchPost } = usePost<ResponseData, RequestVars>("/user");

  const { fetchUpdate } = useUpdate<ResponseData, RequestVars>("/user");

  const { fetchDelete } = useDelete<ResponseData>("/user");

  const handlePost = async (vars: RequestVars) => {
    const created = await fetchPost(vars);
    if (created.data) {
      console.log(created.data);
    }
  };

  const handleUpdate = async (id: number, vars: RequestVars) => {
    const updated = await fetchUpdate(id, vars, {
      method: "PUT",
    });
    if (updated.data) {
      console.log(updated.data);
    }
  };

  const handleDelete = async (id: number) => {
    const deleted = await fetchDelete(id);
    if (deleted.data) {
      console.log(deleted.data);
    }
  };

  return (
    <div>
      <button onClick={() => handlePost({ name: "Gold D. Roger" })}>
        Post
      </button>
      <button onClick={() => handleUpdate(1, { name: "Monkey D Luffy" })}>
        update
      </button>
      <button onClick={() => handleDelete(1)}> delete </button>
    </div>
  );
}

function App() {
  return (
    <ApiConfigProvider axiosConfigParams={{ baseURL: "http://localhost:3001" }}>
      <AllHooksExample />
    </ApiConfigProvider>
  );
}
```

### useGet
Will run a axios.get() and bring to you the data.

#### Usage

```tsx
import React from "react";
import { useGet, ApiConfigProvider} from 'zoe-data'

function UseGetExample() {
  const { data, loading, status, axiosOriginalResponse } = useGet<GitHubResponse[]>(
    "/users/kennedy-f/repos"
  );

  if (status === 404) {
    console.log("error");
  }

  return <> {loading ? "loading" : JSON.stringify(data)}</>;
}

function App() {
  return (
    <ApiConfigProvider
      axiosConfigParams={{ baseURL: "https://api.github.com/" }}
    >
      <UseGetExample/>
    </ApiConfigProvider>
  );
}
```

### useUpdate

Can be a axios.patch() or a axios.put(), by default is a axios.patch(). The route that you pass will be called with the
ID in the fetchUpdate, if your route is `/users` and you call the fetchUpdate function will your request will
be  `/users/$id`.

**Can't make multiple updates, just one ID per update, to make more create a custom hook or use an axios instance.**

#### Usage

```tsx
import React from 'react';
import {ZoeProvider, useUpdate} from 'zoe-data';

function Update() { 
  const { fetchUpdate } = useUpdate('/user')
  return <button onClick={() => fetchUpdate(1, { name: 'Monkey D. Luffyer' } ) }> update </button>
}

function App() { 
  return(
    <ZoeProvider axiosConfigParams={{baseURL: 'http://localhost:3001' }}> 
      <Update />
    </ZoeProvider>
  )
} 

```

#### Can receive generics for the variables and for the response data.

```tsx
const {fetchUpdate} = useUpdate<ResponseData, RequestVars>('/users')
```

#### Custons routes

For customs routes you can pass a prop called `custom Query`, write you query with the custom field with `$id`, this
string will be changed for the ID you pass through.

```tsx
const {fetchUpdate} = useUpdate<ResponseData, RequestVars>('', { customQuery: '/users/$id/update' })
```

#### Change method

```tsx
const {fetchUpdate} = useUpdate<ResponseData, RequestVars>('', { customQuery: '/users/$id/update', method: 'PUT' })

const handleUpdate = async (id: number, data: RequestVars) => {
    const updated = await fetchUpdate(id, data, {
      method: "PUT",
    });
    if (updated.data) {
      console.log(updated.data);
    }
  };
```

### useDelete

Runs an axios.delete() and bring to you the data.

```typescript jsx
import React from 'react';

function Delete() {
  const { fetchDelete } = useDelete<ResponseData>("/user");
  return <button onClick={() => fetchDelete(1)}> delete </button>
}
```
