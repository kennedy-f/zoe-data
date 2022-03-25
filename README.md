
# Zoe data

This library provides hooks to make your APIs calls. 

Use [Axios](https://axios-http.com/) and receive axios params if you need 😉 

Inspired by [Apollo Client](https://www.apollographql.com/docs/react/)


This package is under construction and this doc will be updated

## Hooks

### useGet
Will run a axios.get() and bring to you the data.

####usage

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

