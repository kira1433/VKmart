package server.app.item;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.app.user.User;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/items")
public class ItemController{
    @Autowired
    ItemRepository itemRepository;

    @GetMapping("/")
    public List<Item> fetchAllItems(){
        return itemRepository.findAll();
    }
    @GetMapping("/{code}")
    public Item fetchItemById(@PathVariable long code){
        return itemRepository.findItemByCode(code);
    }
    @PostMapping("/search/")
    public List<Item> fetchItemsByName(@RequestBody User user){
        return itemRepository.findAllBySeller(user);
    }
    @GetMapping("/search/name")
    public List<Item> fetchItemsByName(@RequestParam("name") String name){
        return itemRepository.findAllByNameLike(name);
    }
    @GetMapping("/search/price")
    public List<Item> fetchItemsByPrice(@RequestParam("first") long first,@RequestParam("second") long second){
        return itemRepository.findAllByPriceIsBetween(first,second);
    }
    @GetMapping("/search/offer")
    public List<Item> fetchItemByOffer(@RequestParam("offer") long offer){
        return itemRepository.findAllByOfferGreaterThanEqual(offer);
    }
    @GetMapping("/search/time")
    public List<Item> fetchItemByTime(@RequestParam("Time") long time){
        return itemRepository.findAllByTimeBefore(time);
    }
    @PutMapping("/add")
    public List<Item> addItem(@RequestBody Item item){
        itemRepository.save(item);
        return itemRepository.findAll();
    }
    @PutMapping("/addAll")
    public List<Item> addItems(@RequestBody List<Item> items){
        for (Item item:items) {
            itemRepository.save(item);
        }
        return itemRepository.findAll();
    }
    @Transactional
    @PutMapping("/update")
    public void updateItem(@RequestBody Item item){
        itemRepository.updateItem(item, item.getCode());
    }


    @DeleteMapping("/delete/{id}")
    public void deleteItem(@PathVariable long id){
        itemRepository.deleteById(id);
    }
}
