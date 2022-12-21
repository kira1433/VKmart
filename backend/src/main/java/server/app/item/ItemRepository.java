package server.app.item;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import server.app.user.User;

import java.util.List;
public interface ItemRepository extends ListCrudRepository<Item,Long> {
    public Item findItemByCode(long code);
    List<Item> findAllByOfferGreaterThanEqual(long offer);
    public List<Item> findAllByNameLike(String name);
    public List<Item> findAllByPriceIsBetween(long first,long second);
    public List<Item> findAllByTimeBefore(long time);
    public List<Item> findAllBySeller(User user);
    @Modifying
    @Query("update Item i set i = :item where i.code= :code")
    public void updateItem(@Param(value = "item") Item item, @Param(value = "code") long code);

}
