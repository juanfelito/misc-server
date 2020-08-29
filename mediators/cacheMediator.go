package mediators

import (
	"sync"
)

type CacheMediator interface {
	SetKey(string, []byte)
	GetKey(string) ([]byte, bool)
}

type cache struct {
	store *map[string][]byte
	mutex *sync.RWMutex
}

func (c *cache) GetKey(key string) ([]byte, bool) {
	c.mutex.RLock()
	value, ok := (*c.store)[key]
	c.mutex.RUnlock()

	if ok {
		return value, true
	}

	return nil, false
}

func (c *cache) SetKey(key string, value []byte) {
	c.mutex.Lock()
	(*c.store)[key] = value
	c.mutex.Unlock()
}

func NewCacheMediator(store *map[string][]byte, mutex *sync.RWMutex) *cache {
	return &cache{
		store: store,
		mutex: mutex,
	}
}
