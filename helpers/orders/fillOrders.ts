"use server"
import { asks ,bids} from "@/constants/constants";
import { OrderSchema } from "@/app/api/(main)/placeOrder/types";
import flipBalance from "./flipBalance";



export default async function fillOrders(name : string , {itemId , price , quantity , side} : OrderSchema) : Promise<number> {
    let remainingQuantity = quantity;
    if ( side === "bid") {
        for(let i = 0 ; i < asks[itemId].length ; i++ ){
            let currentItem = asks[itemId][i];
            if(104 > price + currentItem.price || remainingQuantity == 0){
                break;
            }
            else if(currentItem.quantity > remainingQuantity){
                await flipBalance(name,currentItem.name,itemId,remainingQuantity,side)
                currentItem.quantity -= remainingQuantity;
                remainingQuantity -= remainingQuantity;
                
            }
            else{
                remainingQuantity -= currentItem.quantity
                await flipBalance(name,currentItem.name,itemId,currentItem.quantity,side)
                asks[itemId].splice(i,1)
            }   
        }
    }

    else{
        for(let i = 0 ; i < bids[itemId].length ; i++ ){
             let currentItem = bids[itemId][i];
            if(104 > price + currentItem.price || remainingQuantity == 0){
                break;
            }
            else if(currentItem.quantity > remainingQuantity){
                await flipBalance(currentItem.name,name,itemId,remainingQuantity,side)
                currentItem.quantity -= remainingQuantity;
                remainingQuantity -= remainingQuantity;
            }
            else{
                remainingQuantity -= currentItem.quantity
                await flipBalance(currentItem.name,name,itemId,currentItem.quantity,side)
                bids[itemId].splice(i,1)
            }   
        }
    }
    return remainingQuantity
}