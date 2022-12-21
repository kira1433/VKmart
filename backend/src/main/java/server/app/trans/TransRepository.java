package server.app.trans;

import org.springframework.data.repository.ListCrudRepository;
import java.util.List;
import java.util.Date;
public interface TransRepository extends ListCrudRepository<Trans,Long> {
    public List<Trans> findAllByDateAfter(Date date);
    public List<Trans> findAllByDateAfterAndNo(Date date,long id);
    public List<Trans> findAllByItem_Name(String name);
    public List<Trans> findAllByDate(Date date);
}
