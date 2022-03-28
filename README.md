

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
npm install --save zoejs/zoe
```

### Usage 

```typescript jsx
import { useGet, ZoeProvider } from 'zoe-data'

function App() { 
  return (
    <ZoeProvider axiosConfigParams={{ baseURL: "http://localhost:3001" }}>
      {InitialExample}
    </ZoeProvider>
  )
} 

function Example() {
  const {data} = useGet('/users') 
  
  return (
    <> JSON.stringify(data) </>
  )
} 

```

## Hooks

All the hooks that modify data don't run in the moment they are created, for this use the fetch function they give to you. 

#### Examples

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

  const handlePost = async (data: RequestVars) => {
    const created = await fetchPost({ variables: data });
    if (created.data) {
      console.log(created.data);
    }
  };

  const handleUpdate = async (id: number, data: RequestVars) => {
    const updated = await fetchUpdate({ id: 1, variables: data });
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

#### Params 
| NAME | TYPE | REQUIRED  | 
|--|--|--|
| fetchOnInitialize | boolean | false 
| variables | generic | false 
| overrideAxios | AxiosRequestConfig | false

### useUpdate


```

```
