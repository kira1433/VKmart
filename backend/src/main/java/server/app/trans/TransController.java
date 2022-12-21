package server.app.trans;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Date;

@RestController
@CrossOrigin
@RequestMapping("/trans")
public class TransController {
    @Autowired
    TransRepository transRepository;

    @GetMapping("/")
    public List<Trans> fetchAllTrans(){
        Date now = new Date();
        Date then = new Date(now.getTime() - 2628000000L);
        return transRepository.findAllByDateAfter(then);
    }
    @GetMapping("/{id}")
    public List<Trans> fetchTransById(@PathVariable long id) {
        Date now = new Date();
        Date then = new Date(now.getTime() - 2628000000L);
        return transRepository.findAllByDateAfterAndNo(then, id);
    }
    @GetMapping("/name")
    public List<Trans> fetchTransByName(@RequestParam("name") String name){
        return transRepository.findAllByItem_Name(name);
    }
    @GetMapping("/date")
    public List<Trans> fetchTransByDate(@RequestBody Date date){
        return transRepository.findAllByDate(date);
    }
    @PutMapping("/add")
    public List<Trans> addTrans(@RequestBody Trans trans){
        transRepository.save(trans);
        return transRepository.findAll();
    }
    @DeleteMapping("/delete")
    public void deleteTrans(Date date){
        List<Trans> found = transRepository.findAll();
        for(Trans trans : found) {
            if (trans.getDate().before(date)) {
                transRepository.delete(trans);
            }
        }
    }
}
