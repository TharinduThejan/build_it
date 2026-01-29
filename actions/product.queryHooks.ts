"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { ProductPayload } from "@/types/product";
import {   
  addProductServer,
  updateProductServer,
  deleteProductServer,
  getProductByIdServer,
  getProductsServer } from "./productapi";

export function useProducts(token?:string,productId?:string){
const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProductsServer,
  });

 const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductByIdServer(productId!),
    enabled: !!productId,
  });

  const addProduct = useMutation({
    mutationFn: (product: ProductPayload) => {
      if (!token) throw new Error("Missing access token");
      return addProductServer(product, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: (product: ProductPayload) => {
      if (!token || !productId) throw new Error("Missing data");
      return updateProductServer(productId, product, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => {
      if (!token) throw new Error("Missing access token");
      return deleteProductServer(id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

return {
    productsQuery,
    productQuery,

    addProduct,
    updateProduct,
    deleteProduct,
  };
}


