import prisma from "@/lib/prisma"

export const getProductByName = async(name:string) => {
    try {
        const products = await prisma.product.findMany({
                where: {
                    title: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
        })
       return products
    } catch (error) {
        return []
    }   
}
