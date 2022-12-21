package server.app.user;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
public interface UserRepository extends ListCrudRepository<User,Long> {
    public User findUserById(long id);
    @Modifying
    @Query("update User u set u.pswd = :pswd where u.email= :email")
    public void updatePswd(@Param(value = "email") String email, @Param(value = "pswd") String pswd);

    @Modifying
    @Query("update User u set u.balance = :balance where u.id= :id")
    public void updateBalance(@Param(value = "id") long id , @Param(value = "balance") Long balance);

    public User findUserByIdAndPswd(long id,String pswd);
}
