import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "./use-toast";

export type ItemType = {
  id: string;
  [key: string]: any;
};

const useLocalStorage = (key: string, initialValue: ItemType[] = []) => {
  const [storedValue, setStoredValue] = useState<ItemType[]>([]);
  const [data, setData] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = () => {
    try {
      const item = window.localStorage.getItem(key);
      const parsedItem = item ? JSON.parse(item) : initialValue;
      setStoredValue(parsedItem);
      setData(parsedItem);
    } catch (error) {
      console.error("Erro ao acessar o localStorage:", error);
      setStoredValue(initialValue);
      setData(initialValue);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    try {
      if (!loading) {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }, [key, storedValue, loading]);

  const getAll = (): ItemType[] => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Erro ao obter dados do localStorage:", error);
      return [];
    }
  };

  const getOne = (id: string | number): ItemType | null => {
    const items = getAll();
    return items.find((item) => item.id === id) || null;
  };

  const add = (item: Omit<ItemType, "id">) => {
    const newItem: ItemType = { id: uuidv4(), ...item };
    setStoredValue((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      window.localStorage.setItem(key, JSON.stringify(updatedItems));
      return updatedItems;
    });
    fetchData();
  };

  const update = (id: string | string[], newItem: Partial<ItemType>) => {
    setStoredValue((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, ...newItem } : item
      );
      window.localStorage.setItem(key, JSON.stringify(updatedItems));
      return updatedItems;
    });
    fetchData();
  };

  const remove = (id: string) => {
    setStoredValue((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      window.localStorage.setItem(key, JSON.stringify(updatedItems));
      return updatedItems;
    });

    toast({
      title: 'Sucesso!',
      description: "Item removido com sucesso",
    })

    console.log(`Item removido: ${id}`);

    fetchData();
  };

  return { storedValue, data, fetchData, loading, add, update, remove, getAll, getOne };
};

export default useLocalStorage;
