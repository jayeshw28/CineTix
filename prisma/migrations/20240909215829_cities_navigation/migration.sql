/*
  Warnings:

  - You are about to drop the column `lat` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Address` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "States" AS ENUM ('Andhra_Pradesh', 'Arunachal_Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra_and_Nagar_Haveli_and_Daman_and_Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal_Pradesh', 'Jammu_and_Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya_Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil_Nadu', 'Telangana', 'Tripura', 'Uttar_Pradesh', 'Uttarakhand', 'West_Bengal');

-- CreateEnum
CREATE TYPE "City" AS ENUM ('Agra', 'Ahmedabad', 'Allahabad', 'Amritsar', 'Bangalore', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai', 'Coimbatore', 'Delhi', 'Faridabad', 'Ghaziabad', 'Goa', 'Gurgaon', 'Guwahati', 'Hyderabad', 'Indore', 'Jaipur', 'Kanpur', 'Kochi', 'Kolkata', 'Lucknow', 'Ludhiana', 'Madurai', 'Mangalore', 'Mumbai', 'Nagpur', 'Noida', 'Patna', 'Pune', 'Ranchi', 'Surat', 'Thiruvananthapuram', 'Vadodara', 'Varanasi', 'Visakhapatnam');

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "lat",
DROP COLUMN "lng",
ADD COLUMN     "city" "City" NOT NULL DEFAULT 'Delhi',
ADD COLUMN     "state" "States" NOT NULL DEFAULT 'Delhi';
