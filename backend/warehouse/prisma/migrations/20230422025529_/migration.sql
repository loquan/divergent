-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Warehouse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "remove" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Warehouse" ("id", "remove") SELECT "id", "remove" FROM "Warehouse";
DROP TABLE "Warehouse";
ALTER TABLE "new_Warehouse" RENAME TO "Warehouse";
CREATE TABLE "new_Shelve" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shelveName" TEXT NOT NULL,
    "remove" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "zoneId" INTEGER NOT NULL,
    CONSTRAINT "Shelve_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Shelve" ("id", "remove", "shelveName", "zoneId") SELECT "id", "remove", "shelveName", "zoneId" FROM "Shelve";
DROP TABLE "Shelve";
ALTER TABLE "new_Shelve" RENAME TO "Shelve";
CREATE TABLE "new_Zone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "remove" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "warehouseId" INTEGER NOT NULL,
    CONSTRAINT "Zone_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Zone" ("id", "remove", "warehouseId") SELECT "id", "remove", "warehouseId" FROM "Zone";
DROP TABLE "Zone";
ALTER TABLE "new_Zone" RENAME TO "Zone";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
