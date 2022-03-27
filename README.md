

# Zoe data

This library provides hooks to make your APIs calls. 

Use [Axios](https://axios-http.com/) and receive axios params if you need 😉 

Inspired by [Apollo Client](https://www.apollographql.com/docs/react/)


This package is under construction and this doc will be updated

## Hooks

All the hooks that modify data don't run in the moment they are created, for this use the fetch function they give to you. 

#### Examples

```
function HooksExample() { 
	const { data, loading, status, error, axiosOriginalResponse, refetch } =  
	  useGet<ResponseData>("/user");  
	  
	const { fetchPost } = usePost<ResponseData, RequestVars>("/user");  
	  
	const { fetchUpdate } = useUpdate<ResponseData, RequestVars>("/user");  
	  
	const { fetchDelete } = useDelete<ResponseData>("/user");  
	  
	const handlePost = async (id: number, data: RequestVars) => {  
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
	  
	return <div>... your code here</div>;
}

```

### useGet
Will run a axios.get() and bring to you the data.

#### Usage

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


#### Params 
| NAME | TYPE | REQUIRED  | |
|--|--|--|--|
| query | string | true | first param 
| fetchOnInitialize | boolean | false | 
| variables | generic | false |
| overrideAxios | AxiosRequestConfig | false

### refetch

Refetch is a function that will do the fetch again, you can pass new params if you need. 

### useUpdate


```

```
