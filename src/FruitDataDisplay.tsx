"use client";
import useSWR from "swr";
import { Fruit, GroupByKey } from "./lib/definitions";
import { fetchFruitsMock } from "./lib/fetchFruits";
import FruitGrid from "./ui/FruitList/FruitGrid";
import FruitList from "./ui/FruitList/FruitList";

export default function FruitDataDisplay({
  groupBy,
  view,
  onAddToJar,
  onAddGroupToJar,
}: {
  view: "grid" | "list";
  groupBy: GroupByKey | "none";
  onAddToJar: (fruit: Fruit) => void;
  onAddGroupToJar: (groupFruits: Fruit[]) => void;
}) {
  const { data, error } = useSWR<Fruit[]>(
    "https://www.fruityvice.com/api/fruit/all",
    fetchFruitsMock,
    { suspense: true }
  );

  console.log(data, error);

  return view === "list" ? (
    <FruitList
      fruits={data!}
      groupBy={groupBy}
      onAddToJar={onAddToJar}
      onAddGroupToJar={onAddGroupToJar}
    />
  ) : (
    <FruitGrid fruits={data!} groupBy={groupBy} onAddToJar={onAddToJar} />
  );
}
