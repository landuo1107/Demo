/*
 * @Author: xin15751452892 xin15751452892@163.com
 * @Date: 2023-11-17 21:49:31
 * @LastEditors: xin15751452892 xin15751452892@163.com
 * @LastEditTime: 2023-11-18 14:02:26
 * @FilePath: \Dashboard\src\layouts\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import PageLoading from "@/components/PageLoading";
import globalModel from "@/models/global.model";
import { Suspense } from "react";
import { Await, Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";

const AuthLayout = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Await resolve={globalModel.load()}>
        {(res) => {
          // if (!res?.data?.user) {
          //   return <Navigate to="/login" state={{ from: location }} replace />;
          // }
          return <MainLayout />;
        }}
      </Await>
    </Suspense>
  );
};

export default AuthLayout;
