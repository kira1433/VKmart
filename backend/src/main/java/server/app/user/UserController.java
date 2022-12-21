package server.app.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import server.app.item.*;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public List<User> fetchAllUsers(){
        return userRepository.findAll();
    }
    @GetMapping("/{id}")
    public User fetchUserById(@PathVariable long id){
        return userRepository.findUserById(id);
    }
    @GetMapping("/check")
    public User passwordCheck(@RequestParam("id")long id,@RequestParam("pswd") String pswd){
        return userRepository.findUserByIdAndPswd(id,pswd);
    }
    @PutMapping("/add")
    public boolean addUser(@RequestBody User user){

        if(!user.getEmail().isEmpty() && !user.getName().isEmpty() && !user.getAddress().isEmpty() && !user.getPhno().isEmpty() && !user.getPswd().isEmpty() && user.getType()!='\0') {
            userRepository.save(user);
            return true;
        }
        else
        return false;
    }
    @Transactional
    @PutMapping("/change")
    public void changePassword(@RequestParam("email") String email , @RequestParam("pswd") String pswd){
        userRepository.updatePswd(email,pswd);
    }

    @Transactional
    @PutMapping("{id}/balance")
    public void addBalance(@PathVariable("id")long id, @RequestParam("balance") Long balance){
        userRepository.updateBalance(id,fetchUserById(id).getBalance()+balance);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable long id){
        userRepository.deleteById(id);
    }
    @Transactional
    @PutMapping("/{id}/cart/add")
    public User addToCart(@PathVariable("id")long id,@RequestBody Item item,@RequestParam("count") long count){
        User found = fetchUserById(id);
        List<Item> cart = found.getCart();
        List<Long> qty = found.getQty();
        cart.add(item);
        found.setCart(cart);
        qty.add(count);
        found.setQty(qty);
        return found;
    }
    @Transactional
    @PutMapping("/{id}/cart/update")
    public User updateCart(@PathVariable("id")long id,@RequestBody Item item,@RequestParam("count") long count){
        User found = fetchUserById(id);
        List<Long> qty = found.getQty();
        for(Item i: found.getCart()) {
            if (i.getCode() == item.getCode()) {
                qty.set(found.getCart().indexOf(i), count);
            }
        }
        found.setQty(qty);
        return found;
    }
    @Transactional
    @PutMapping("/{id}/cart/remove")
    public User removeFromCart(@PathVariable("id")long id,@RequestBody Item item){
        User found = fetchUserById(id);
        List<Item> cart = found.getCart();
        List<Long> qty = found.getQty();
        List<Item> cart1=new ArrayList<Item>();
        List<Long> qty1=new ArrayList<Long>();
        for(int i=0;i<cart.size();i++)
        {
            if(cart.get(i).getCode()== item.getCode())
                continue;
            else{
                cart1.add(cart.get(i));
                qty1.add(qty.get(i));
            }
        }
        found.setCart(cart1);
        found.setQty(qty1);
        return found;
    }
    @GetMapping("/{id}/cart/total")
    public long priceOfCart(@PathVariable("id")long id){
        User found = fetchUserById(id);
        List<Item> cart = found.getCart();
        long total = 0L;
        for(Item item : cart){
            total += (found.getQty().get(cart.indexOf(item))* (100-item.getOffer())/100 * item.getPrice());
        }
        return total;
    }
    @GetMapping("/{id}/cart/estimate")
    public long estimateCart(@PathVariable("id")long id){
        List<Item> cart = fetchUserById(id).getCart();
        long total = 0L;
        for(Item item : cart){
            total = Math.max(total,item.getTime());
        }
        return total;
    }
    @Transactional
    @DeleteMapping("/{id}/cart/buy")
    public User BuyCart(@PathVariable("id")long id){
        User found = fetchUserById(id);
        List<Item> cart = found.getCart();
        long bal = found.getBalance();
        long total = priceOfCart(id);
        if(bal>=total){
            found.setBalance(bal-total);
            found.setCart(Collections.<Item>emptyList());
            found.setQty(Collections.<Long>emptyList());
            System.out.println("Thank you for purchase.");
        }
        else{
            System.out.println("Sorry,you don't have enough balance.");
        }
        return found;
    }
}
