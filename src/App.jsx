import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import NotFound from './pages/NotFound';
import Root from './pages/Root';
import MainContents from './components/main_contents/MainContents'
import SummonerInfo from './components/summoner_info/Summoner_info'

function App({ APIs }) {
   const router = createBrowserRouter([
      {
         path: '/',
         element : <Root />,
         errorElement: <NotFound/>,
         children :[
            { index : true, element: <MainContents/>},
            { path : '/search/:summonerName' , element : <SummonerInfo  APIs={APIs}/>},
         ]
      },
   ])

   return (
      <RouterProvider router={router} />
   );
}

export default App;
