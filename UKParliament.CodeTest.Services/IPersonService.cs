using System.Linq;
using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Services
{
    public interface IPersonService
    {
        IQueryable<Person> GetAll();

        Person Get(int id);

        int Add(Person person);

        int Update(Person person);

        int Delete(int id);
    }
}