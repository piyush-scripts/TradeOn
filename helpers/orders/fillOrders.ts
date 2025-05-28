"use server"
import { bids , asks } from "@/app/api/(main)/orders/[itemId]/route"
import prisma from "@/lib/prisma"
import { OrderSchema } from "@/app/api/(main)/orders/types";
import flipBalance from "./flipBalance";



export default async function fillOrders(name : string , {itemId , price , quantity , side} : OrderSchema) : Promise<number> {
    let remainingQuantity = quantity;
    if ( side === "bid") {
        for(let i = 0 ; i < asks[itemId].length ; i++ ){
            let currentItem = asks[itemId][i];
            if(currentItem.price > price || remainingQuantity == 0){
                break;
            }
            else if(currentItem.quantity > remainingQuantity){
                currentItem.quantity -= remainingQuantity;
                remainingQuantity -= remainingQuantity;
                flipBalance(name,currentItem.name,itemId,currentItem.price,remainingQuantity)
            }
            else{
                remainingQuantity -= currentItem.quantity
                flipBalance(name,currentItem.name,itemId,currentItem.price,currentItem.quantity)
                asks[itemId].splice(i,1)
            }   
        }
    }

    else{
        for(let i = 0 ; i < bids[itemId].length ; i++ ){
             let currentItem = bids[itemId][i];
            if(currentItem.price < price || remainingQuantity == 0){
                break;
            }
            else if(currentItem.quantity > remainingQuantity){
                currentItem.quantity -= remainingQuantity;
                remainingQuantity -= remainingQuantity;
                flipBalance(currentItem.name,name,itemId,currentItem.price,remainingQuantity)
            }
            else{
                remainingQuantity -= currentItem.quantity
                flipBalance(currentItem.name,name,itemId,currentItem.price,currentItem.quantity)
                bids[itemId].splice(i,1)
            }   
        }
    }
    return remainingQuantity
}